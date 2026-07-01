// TP & Labs IT — Catégorie : supervision
// 5 TP(s)

const LABS_SUPERVISION = [
  {
    id: 14,
    titre: "Zabbix — installation et surveillance d'hôtes Linux et Cisco",
    categorie: "supervision",
    niveau: "intermédiaire",
    duree: 120,
    description: "Installer Zabbix Server 6.x sur Debian avec MariaDB et Nginx, configurer l'interface web, ajouter des hôtes Linux via agent Zabbix et des équipements Cisco via SNMP. Créer des triggers d'alerte sur CPU, espace disque et disponibilité des interfaces.",
    objectifs: [
      "Installer Zabbix Server 6.x avec MariaDB et Nginx",
      "Déployer l'agent Zabbix sur un hôte Linux supervisé",
      "Ajouter un équipement Cisco via SNMP v2c",
      "Créer des items, triggers et alertes personnalisés",
      "Configurer un dashboard de supervision global"
    ],
    prerequis: [
      { type: "vm", nom: "VM Debian 12 (Zabbix Server) — 2 vCPU, 2GB RAM min" },
      { type: "vm", nom: "VM Debian 12 (hôte supervisé avec agent)" },
      { type: "vm", nom: "Routeur Cisco IOSv (supervisé via SNMP)" },
      { type: "reseau", nom: "Connectivité IP entre toutes les VMs" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer Zabbix Server sur Debian 12",
        contexte: "On installe Zabbix depuis le dépôt officiel (ne pas utiliser les paquets Debian par défaut — souvent obsolètes). L'installation comprend le serveur, le frontend Nginx et l'agent local.",
        commandes: [
          { os: "linux", cmd: "# Télécharger le dépôt Zabbix officiel\nwget https://repo.zabbix.com/zabbix/6.4/debian/pool/main/z/zabbix-release/zabbix-release_6.4-1+debian12_all.deb\nsudo dpkg -i zabbix-release_6.4-1+debian12_all.deb\nsudo apt update", commentaire: "Ajouter le dépôt officiel Zabbix 6.4" },
          { os: "linux", cmd: "sudo apt install -y zabbix-server-mysql zabbix-frontend-php zabbix-nginx-conf zabbix-sql-scripts zabbix-agent", commentaire: "Installer Zabbix Server + frontend + agent" },
          { os: "linux", cmd: "sudo apt install -y mariadb-server\nsudo systemctl enable mariadb --now", commentaire: "Installer et démarrer MariaDB" },
          { os: "linux", cmd: "sudo mysql -uroot -e \"CREATE DATABASE zabbix CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; CREATE USER \'zabbix\'@\'localhost\' IDENTIFIED BY \'ZabbixPass123\'; GRANT ALL PRIVILEGES ON zabbix.* TO \'zabbix\'@\'localhost\'; FLUSH PRIVILEGES;\"", commentaire: "Créer la base de données Zabbix" },
          { os: "linux", cmd: "zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | sudo mysql --default-character-set=utf8mb4 -uzabbix -p zabbix", commentaire: "Importer le schéma SQL Zabbix (1-2 minutes)" },
          { os: "linux", cmd: "# Modifier /etc/zabbix/zabbix_server.conf :\n# DBPassword=ZabbixPass123\nsudo sed -i \'s/# DBPassword=/DBPassword=ZabbixPass123/\' /etc/zabbix/zabbix_server.conf", commentaire: "Configurer le mot de passe DB" },
          { os: "linux", cmd: "sudo systemctl restart zabbix-server zabbix-agent nginx php8.2-fpm\nsudo systemctl enable zabbix-server zabbix-agent nginx php8.2-fpm\nsudo systemctl status zabbix-server", commentaire: "Démarrer et activer tous les services" }
        ],
        erreurs_courantes: [
          {
            symptome: "zabbix-server ne démarre pas — cannot connect to database",
            cause: "Mot de passe DB incorrect dans zabbix_server.conf ou DB non créée",
            solution: "Vérifier DBPassword dans /etc/zabbix/zabbix_server.conf. Tester : mysql -uzabbix -pZabbixPass123 zabbix"
          },
          {
            symptome: "Interface web Zabbix inaccessible",
            cause: "Nginx ou php-fpm ne tourne pas",
            solution: "sudo systemctl status nginx php8.2-fpm. Vérifier /etc/zabbix/nginx.conf — listen et server_name doivent être décommentés."
          }
        ]
      },
      {
        titre: "Étape 2 — Finaliser via l'interface web",
        contexte: "On accède à l'interface web pour terminer la configuration initiale. Identifiants par défaut : Admin / zabbix — à changer immédiatement.",
        commandes: [
          { os: "both", cmd: "# Navigateur : http://192.168.1.10/zabbix\n# 1. Vérifier prérequis PHP (tout OK)\n# 2. DB : localhost, zabbix, ZabbixPass123\n# 3. Server : localhost:10051\n# 4. Timezone : Europe/Paris\n# 5. Finish\n# Login : Admin / zabbix — CHANGER le mdp !", commentaire: "Assistant web en 5 étapes" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Ajouter un hôte Linux avec agent",
        contexte: "On installe l'agent Zabbix sur le deuxième serveur Linux et on l'ajoute dans l'interface. L'agent collecte CPU, RAM, disque, processus et envoie les données au serveur.",
        commandes: [
          { os: "linux", cmd: "# Sur 192.168.1.20 — installer l'agent :\nsudo apt install -y zabbix-agent", commentaire: "Installer l'agent Zabbix (dépôt déjà ajouté)" },
          { os: "linux", cmd: "# Configurer /etc/zabbix/zabbix_agentd.conf :\n# Server=192.168.1.10\n# ServerActive=192.168.1.10\n# Hostname=linux-host-01\nsudo nano /etc/zabbix/zabbix_agentd.conf", commentaire: "Pointer l'agent vers le Zabbix Server" },
          { os: "linux", cmd: "sudo systemctl restart zabbix-agent\nsudo systemctl enable zabbix-agent\nsudo ufw allow 10050/tcp", commentaire: "Démarrer l'agent et ouvrir le port" },
          { os: "both", cmd: "# Interface web Zabbix :\n# Configuration → Hosts → Create host\n# Host name : linux-host-01\n# Interface : Agent, 192.168.1.20:10050\n# Templates : Linux by Zabbix agent → Add", commentaire: "Ajouter l'hôte dans l'interface web" }
        ],
        erreurs_courantes: [
          {
            symptome: "Hôte en rouge dans Zabbix — ZBX non joignable",
            cause: "Firewall bloque le port 10050 ou mauvaise IP dans zabbix_agentd.conf",
            solution: "Tester depuis le serveur : nc -zv 192.168.1.20 10050"
          }
        ]
      },
      {
        titre: "Étape 4 — Ajouter un équipement Cisco via SNMP",
        contexte: "Les équipements Cisco sont supervisés via SNMP. On configure SNMP sur le routeur puis on l'ajoute dans Zabbix avec le template Cisco.",
        commandes: [
          { os: "linux", cmd: "R1(config)# snmp-server community public RO\nR1(config)# snmp-server location Salle-Lab\nR1(config)# snmp-server contact admin@lab.local\nR1(config)# snmp-server host 192.168.1.10 version 2c public\nR1# show snmp", commentaire: "Configurer SNMP v2c sur Cisco" },
          { os: "linux", cmd: "snmpwalk -v2c -c public 192.168.1.1 sysDescr", commentaire: "Tester SNMP depuis le Zabbix Server" },
          { os: "both", cmd: "# Interface Zabbix :\n# Configuration → Hosts → Create host\n# Host : cisco-r1 / Interface SNMP : 192.168.1.1:161\n# SNMP v2c, community=public\n# Templates : Cisco IOS by SNMP → Add", commentaire: "Ajouter le routeur avec le template SNMP Cisco" }
        ],
        erreurs_courantes: [
          {
            symptome: "snmpwalk timeout",
            cause: "UDP 161 bloqué ou community incorrecte",
            solution: "Vérifier R1# show snmp. Ping 192.168.1.10 depuis R1."
          }
        ]
      },
      {
        titre: "Étape 5 — Créer des triggers et un dashboard",
        contexte: "Les triggers définissent les conditions d'alerte. On crée des alertes CPU et disque, puis un dashboard de supervision global.",
        commandes: [
          { os: "both", cmd: "# Trigger CPU élevé :\n# Configuration → Hosts → linux-host-01 → Triggers → Create\n# Expression : avg(/linux-host-01/system.cpu.util,5m)>80\n# Severity : High → Add", commentaire: "Alerte si CPU > 80% pendant 5 minutes" },
          { os: "both", cmd: "# Trigger disque :\n# Expression : last(/linux-host-01/vfs.fs.pused[/])>90\n# Severity : Warning", commentaire: "Alerte si disque / > 90%" },
          { os: "linux", cmd: "sudo apt install -y stress\nstress --cpu 4 --timeout 60", commentaire: "Simuler charge CPU — vérifier l'alerte dans Zabbix" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Zabbix Server démarré, interface web accessible sur http://192.168.1.10/zabbix",
      "Mot de passe Admin par défaut changé",
      "linux-host-01 ajouté avec agent — icône ZBX verte",
      "Métriques CPU/RAM/disque collectées (Monitoring → Latest data)",
      "Cisco R1 ajouté via SNMP — interfaces visibles",
      "Trigger CPU élevé créé et testé avec stress",
      "Dashboard créé avec widgets Problems et Graph CPU"
    ],
    tags: ["zabbix", "supervision", "snmp", "agent", "monitoring", "trigger", "dashboard", "debian"],
    date_ajout: "2026-03-20",
    source: "École"
  },

  {
    id: 15,
    titre: "SNMP v2c et v3 — configuration et polling sur Linux et Cisco",
    categorie: "supervision",
    niveau: "intermédiaire",
    duree: 75,
    description: "Configurer SNMP sur des équipements Linux (snmpd) et Cisco IOS, interroger les OIDs avec snmpwalk et snmpget. Configurer SNMPv3 avec authentification SHA et chiffrement AES pour remplacer le v2c non sécurisé.",
    objectifs: [
      "Comprendre la structure SNMP : agents, manager, MIB, OID, community strings",
      "Configurer snmpd sur Linux avec restriction par IP source",
      "Configurer SNMP v2c et v3 sur Cisco IOS",
      "Interroger les OIDs avec snmpget, snmpwalk, snmpbulkwalk",
      "Comprendre pourquoi SNMPv3 est obligatoire en production"
    ],
    prerequis: [
      { type: "vm", nom: "1x VM Debian 12 (agent SNMP)" },
      { type: "vm", nom: "1x VM Debian 12 (manager/supervision)" },
      { type: "vm", nom: "1x Cisco IOSv (optionnel)" },
      { type: "reseau", nom: "Connectivité IP entre les VMs" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer et configurer snmpd sur Linux",
        contexte: "On installe le démon SNMP sur le serveur à superviser. La config par défaut expose trop d'infos — on la restreint aux OIDs nécessaires et on limite l'accès par IP manager.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install -y snmpd snmp", commentaire: "Installer snmpd (agent) et les outils client SNMP" },
          { os: "linux", cmd: "sudo cp /etc/snmp/snmpd.conf /etc/snmp/snmpd.conf.bak", commentaire: "Sauvegarder la config avant modification" },
          { os: "linux", cmd: "# Contenu minimal /etc/snmp/snmpd.conf :\nagentAddress udp:161\nrocommunity public 192.168.1.5\nsysLocation Salle-Lab\nsysContact admin@lab.local\nsysName linux-agent-01", commentaire: "Community public restreinte à l'IP manager uniquement" },
          { os: "linux", cmd: "sudo systemctl restart snmpd && sudo systemctl enable snmpd\nsudo ufw allow from 192.168.1.5 to any port 161 proto udp", commentaire: "Démarrer snmpd et ouvrir le port uniquement pour le manager" }
        ],
        erreurs_courantes: [
          {
            symptome: "snmpwalk timeout depuis le manager",
            cause: "snmpd écoute uniquement sur localhost par défaut",
            solution: "Vérifier agentAddress dans snmpd.conf — doit être udp:161 et non udp:127.0.0.1:161."
          }
        ]
      },
      {
        titre: "Étape 2 — Interroger l'agent avec les outils CLI",
        contexte: "Depuis le manager (192.168.1.5), on utilise snmpget, snmpwalk et snmpbulkwalk pour interroger les OIDs de l'agent Linux.",
        commandes: [
          { os: "linux", cmd: "sudo apt install -y snmp snmp-mibs-downloader && sudo download-mibs", commentaire: "Installer les outils SNMP et les MIBs sur le manager" },
          { os: "linux", cmd: "snmpget -v2c -c public 192.168.1.20 sysDescr.0\nsnmpget -v2c -c public 192.168.1.20 sysUpTime.0\nsnmpget -v2c -c public 192.168.1.20 sysName.0", commentaire: "snmpget : récupérer un OID précis" },
          { os: "linux", cmd: "snmpwalk -v2c -c public 192.168.1.20 system", commentaire: "snmpwalk : parcourir le sous-arbre system" },
          { os: "linux", cmd: "snmpwalk -v2c -c public 192.168.1.20 ifDescr\nsnmpwalk -v2c -c public 192.168.1.20 ifOperStatus", commentaire: "Interfaces : description et état opérationnel" },
          { os: "linux", cmd: "snmpbulkwalk -v2c -c public 192.168.1.20 .1.3.6.1.2.1", commentaire: "snmpbulkwalk : plus rapide pour de nombreux OIDs" }
        ],
        erreurs_courantes: [
          {
            symptome: "snmpwalk affiche des erreurs de MIB",
            cause: "Les fichiers MIB ne sont pas installés",
            solution: "sudo apt install snmp-mibs-downloader && sudo download-mibs. Dans /etc/snmp/snmp.conf : mibs ALL"
          }
        ]
      },
      {
        titre: "Étape 3 — Configurer SNMPv3 (auth + chiffrement)",
        contexte: "SNMPv2c transmet les community strings en clair — capturables avec Wireshark. SNMPv3 ajoute authentification SHA et chiffrement AES. Obligatoire en production.",
        commandes: [
          { os: "linux", cmd: "sudo systemctl stop snmpd\nsudo net-snmp-config --create-snmpv3-user -ro -A MonMotDePasseAuth -X MonMotDePassePriv -a SHA -x AES monuser\nsudo systemctl start snmpd", commentaire: "Créer utilisateur SNMPv3 — arrêter snmpd AVANT" },
          { os: "linux", cmd: "# Ajouter dans snmpd.conf :\nrouser monuser priv\nsudo systemctl restart snmpd", commentaire: "Autoriser monuser avec niveau authPriv" },
          { os: "linux", cmd: "snmpget -v3 -u monuser -l authPriv -a SHA -A MonMotDePasseAuth -x AES -X MonMotDePassePriv 192.168.1.20 sysDescr.0", commentaire: "Test SNMPv3 authentifié et chiffré" }
        ],
        erreurs_courantes: [
          {
            symptome: "SNMPv3 retourne Unknown user name",
            cause: "L'utilisateur a été créé alors que snmpd tournait",
            solution: "Toujours stopper snmpd AVANT net-snmp-config --create-snmpv3-user."
          }
        ]
      },
      {
        titre: "Étape 4 — SNMP sur Cisco IOS",
        contexte: "On configure SNMP sur le routeur Cisco et on interroge les OIDs spécifiques Cisco : CPU, mémoire, interfaces.",
        commandes: [
          { os: "linux", cmd: "R1(config)# snmp-server community public RO\nR1(config)# snmp-server location Lab-GNS3\nR1(config)# snmp-server enable traps\nR1# show snmp", commentaire: "SNMP v2c sur Cisco" },
          { os: "linux", cmd: "R1(config)# snmp-server group GROUPE-V3 v3 priv\nR1(config)# snmp-server user monuser GROUPE-V3 v3 auth sha MonMotDePasseAuth priv aes 128 MonMotDePassePriv", commentaire: "SNMPv3 sur Cisco avec SHA + AES128" },
          { os: "linux", cmd: "# OID CPU Cisco 5min :\nsnmpget -v2c -c public 192.168.1.1 .1.3.6.1.4.1.9.2.1.58.0\n# Interfaces :\nsnmpwalk -v2c -c public 192.168.1.1 ifDescr", commentaire: "Interroger CPU et interfaces du routeur" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "snmpd démarré sur linux-agent-01, community restreinte à l'IP manager",
      "snmpget sysDescr.0 depuis le manager : retourne la description Linux",
      "snmpwalk ifDescr : interfaces réseau de l'agent visibles",
      "SNMPv3 SHA+AES configuré : snmpget -v3 -l authPriv fonctionnel",
      "SNMP v2c sur Cisco R1 : snmpwalk retourne les données",
      "OID CPU Cisco (.1.3.6.1.4.1.9.2.1.58.0) interrogeable"
    ],
    tags: ["snmp", "snmpv3", "snmpd", "oid", "mib", "supervision", "cisco", "linux"],
    date_ajout: "2026-03-25",
    source: "École"
  },

  {
    id: 16,
    titre: "Syslog centralisé avec rsyslog — Linux et Cisco",
    categorie: "supervision",
    niveau: "débutant",
    duree: 60,
    description: "Mettre en place un serveur syslog centralisé avec rsyslog sur Debian pour collecter les logs de plusieurs serveurs Linux et équipements Cisco. Les logs sont triés par hôte, filtrés par sévérité et archivés automatiquement via logrotate.",
    objectifs: [
      "Configurer rsyslog en mode serveur UDP/TCP port 514",
      "Configurer les clients Linux pour envoyer leurs logs au serveur",
      "Configurer un routeur Cisco pour envoyer ses logs syslog",
      "Organiser les logs par hôte dans des fichiers séparés",
      "Mettre en place la rotation automatique des logs"
    ],
    prerequis: [
      { type: "vm", nom: "1x VM Debian 12 (serveur syslog)" },
      { type: "vm", nom: "1-2x VM Debian/Ubuntu (clients)" },
      { type: "vm", nom: "1x Cisco IOSv (optionnel)" },
      { type: "reseau", nom: "Connectivité IP entre toutes les machines" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Configurer rsyslog en mode serveur",
        contexte: "Sur le serveur de logs, on active la réception des messages syslog distants en UDP et TCP sur le port 514. On configure ensuite le tri des logs par hôte source dans des fichiers séparés.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install -y rsyslog", commentaire: "rsyslog est généralement déjà installé sur Debian" },
          { os: "linux", cmd: "# Décommenter dans /etc/rsyslog.conf :\nmodule(load=\"imudp\")\ninput(type=\"imudp\" port=\"514\")\nmodule(load=\"imtcp\")\ninput(type=\"imtcp\" port=\"514\")", commentaire: "Activer réception UDP et TCP sur le port 514" },
          { os: "linux", cmd: "# Ajouter à la fin de rsyslog.conf :\n$template RemoteLogs,\"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log\"\n*.* ?RemoteLogs\n& stop", commentaire: "Template : logs triés par hostname et programme" },
          { os: "linux", cmd: "sudo mkdir -p /var/log/remote && sudo chown syslog:adm /var/log/remote\nsudo rsyslogd -N1", commentaire: "Créer le répertoire et vérifier la syntaxe" },
          { os: "linux", cmd: "sudo systemctl restart rsyslog\nsudo ufw allow 514/udp && sudo ufw allow 514/tcp", commentaire: "Redémarrer et ouvrir les ports firewall" }
        ],
        erreurs_courantes: [
          {
            symptome: "rsyslog ne démarre pas après modification",
            cause: "Erreur de syntaxe dans rsyslog.conf",
            solution: "sudo rsyslogd -N1 affiche les erreurs sans démarrer le service."
          }
        ]
      },
      {
        titre: "Étape 2 — Configurer les clients Linux",
        contexte: "Sur chaque client, on configure rsyslog pour transférer les logs vers le serveur centralisé. TCP (@@ ) est préférable à UDP (@) pour ne pas perdre de messages.",
        commandes: [
          { os: "linux", cmd: "# Sur linux-client-1 :\nsudo nano /etc/rsyslog.d/50-remote.conf\n\n# Contenu (TCP vers le serveur) :\n*.* @@192.168.1.10:514", commentaire: "@@ = TCP fiable / @ = UDP" },
          { os: "linux", cmd: "sudo systemctl restart rsyslog\nlogger -t TEST-SYSLOG \"Message de test depuis linux-client-1\"", commentaire: "Redémarrer et envoyer un log test" },
          { os: "linux", cmd: "# Sur le SERVEUR — vérifier la réception :\nls /var/log/remote/\ncat /var/log/remote/linux-client-1/TEST-SYSLOG.log", commentaire: "Le message doit apparaître dans le répertoire de l'hôte" }
        ],
        erreurs_courantes: [
          {
            symptome: "Aucun fichier dans /var/log/remote/",
            cause: "Connexion TCP échoue ou template incorrect",
            solution: "Tester : nc -zv 192.168.1.10 514. Vérifier : sudo journalctl -u rsyslog -f sur le client."
          }
        ]
      },
      {
        titre: "Étape 3 — Configurer Cisco pour envoyer ses logs",
        contexte: "Les routeurs Cisco envoient leurs logs (interfaces up/down, erreurs, auth) vers un serveur syslog externe. On configure le niveau de sévérité et l'IP du serveur.",
        commandes: [
          { os: "linux", cmd: "R1(config)# logging host 192.168.1.10\nR1(config)# logging trap informational\nR1(config)# logging source-interface GigabitEthernet0/0\nR1(config)# service timestamps log datetime msec localtime\nR1(config)# logging on\nR1# show logging", commentaire: "Envoyer logs niveau informational et plus grave" },
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/1\nR1(config-if)# shutdown\nR1(config-if)# no shutdown", commentaire: "Générer des logs — up/down d'interface" },
          { os: "linux", cmd: "cat /var/log/remote/cisco-r1/*.log", commentaire: "Vérifier les logs Cisco sur le serveur" }
        ],
        erreurs_courantes: [
          {
            symptome: "Logs Cisco n'arrivent pas sur le serveur",
            cause: "Interface source non joignable ou UDP 514 bloqué",
            solution: "R1# ping 192.168.1.10. Vérifier show logging sur le routeur."
          }
        ]
      },
      {
        titre: "Étape 4 — Rotation des logs et filtrage",
        contexte: "On configure logrotate pour archiver automatiquement les anciens fichiers et un filtre pour isoler les erreurs critiques dans un fichier dédié.",
        commandes: [
          { os: "linux", cmd: "# Créer /etc/logrotate.d/remote-syslog :\n/var/log/remote/*/*.log {\n    daily\n    rotate 30\n    compress\n    delaycompress\n    missingok\n    notifempty\n    postrotate\n        /usr/lib/rsyslog/rsyslog-rotate\n    endscript\n}", commentaire: "Rotation quotidienne, 30 jours, compression gzip" },
          { os: "linux", cmd: "sudo logrotate -d /etc/logrotate.d/remote-syslog", commentaire: "Tester la config en dry run" },
          { os: "linux", cmd: "# Créer /etc/rsyslog.d/60-critical.conf :\nif $syslogseverity <= 3 then /var/log/remote/CRITICAL.log\n& stop\n\nsudo systemctl restart rsyslog\nlogger -p user.err -t ERREUR-TEST \"Simulation erreur critique\"\ncat /var/log/remote/CRITICAL.log", commentaire: "Logs severity <= 3 dans un fichier dédié" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "rsyslog en mode serveur : écoute UDP et TCP sur 514 (ss -ulnp | grep 514)",
      "logger depuis linux-client-1 : message dans /var/log/remote/linux-client-1/",
      "logger depuis linux-client-2 : message dans /var/log/remote/linux-client-2/",
      "Cisco R1 : logs visibles dans /var/log/remote/ sur le serveur",
      "logrotate configuré et testé en dry run sans erreur",
      "/var/log/remote/CRITICAL.log créé et fonctionnel"
    ],
    tags: ["syslog", "rsyslog", "logs", "supervision", "cisco", "linux", "logrotate", "centralisation"],
    date_ajout: "2026-03-30",
    source: "École"
  },

  {
    id: 36,
    titre: "Grafana + Prometheus — supervision des métriques Linux",
    categorie: "supervision",
    niveau: "intermédiaire",
    duree: 90,
    description: "Déployer Prometheus + Node Exporter + Grafana sur Linux. Prometheus collecte les métriques via Node Exporter, Grafana les visualise. Alerte configurée sur l'utilisation CPU.",
    objectifs: [
      "Installer Prometheus et comprendre son modèle pull",
      "Déployer Node Exporter sur un hôte supervisé",
      "Installer Grafana et le connecter à Prometheus",
      "Importer le dashboard Node Exporter Full (ID 1860)",
      "Créer une alerte sur le CPU > 80%"
    ],
    prerequis: [
      { type: "vm", nom: "VM Ubuntu 22.04 LTS (serveur Prometheus + Grafana)" },
      { type: "vm", nom: "VM cible (hôte supervisé avec Node Exporter)" },
      { type: "reseau", nom: "Les deux VMs joignables sur le réseau local" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer Prometheus",
        contexte: "On installe Prometheus via les binaires officiels avec un utilisateur dédié.",
        commandes: [
          { os: "linux", cmd: "sudo useradd --no-create-home --shell /bin/false prometheus", commentaire: "Créer l'utilisateur système Prometheus" },
          { os: "linux", cmd: "wget https://github.com/prometheus/prometheus/releases/download/v2.51.0/prometheus-2.51.0.linux-amd64.tar.gz && tar xvf prometheus-2.51.0.linux-amd64.tar.gz", commentaire: "Télécharger Prometheus" },
          { os: "linux", cmd: "sudo cp prometheus-2.51.0.linux-amd64/prometheus /usr/local/bin/\nsudo mkdir /etc/prometheus /var/lib/prometheus\nsudo cp -r prometheus-2.51.0.linux-amd64/consoles /etc/prometheus/\nsudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus", commentaire: "Installer les binaires et répertoires" },
          { os: "linux", cmd: "# Créer /etc/prometheus/prometheus.yml :\n# global:\n#   scrape_interval: 15s\n# scrape_configs:\n#   - job_name: prometheus\n#     static_configs: [{targets: [localhost:9090]}]\n#   - job_name: node_exporter\n#     static_configs: [{targets: [192.168.1.20:9100]}]", commentaire: "Configurer les targets à scraper" },
          { os: "linux", cmd: "# Créer /etc/systemd/system/prometheus.service\nsudo systemctl daemon-reload && sudo systemctl enable --now prometheus", commentaire: "Service systemd Prometheus" }
        ],
        erreurs_courantes: [
          { symptome: "Prometheus : permission denied au démarrage", cause: "Fichiers n'appartenant pas à l'utilisateur prometheus", solution: "sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus" }
        ]
      },
      {
        titre: "Étape 2 — Installer Node Exporter et Grafana",
        contexte: "Node Exporter expose les métriques système sur le port 9100. Grafana est installé depuis le dépôt officiel.",
        commandes: [
          { os: "linux", cmd: "# Sur la VM cible :\nwget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz && tar xvf node_exporter-1.7.0.linux-amd64.tar.gz\nsudo cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/\nsudo systemctl enable --now node_exporter\ncurl http://localhost:9100/metrics | head -5", commentaire: "Installer et vérifier Node Exporter" },
          { os: "linux", cmd: "sudo add-apt-repository 'deb https://packages.grafana.com/oss/deb stable main'\nwget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -\nsudo apt update && sudo apt install grafana -y\nsudo systemctl enable --now grafana-server", commentaire: "Installer Grafana depuis le dépôt officiel" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Connecter Prometheus à Grafana et importer le dashboard",
        contexte: "On ajoute Prometheus comme datasource et on importe le dashboard communautaire 1860.",
        commandes: [
          { os: "linux", cmd: "# Grafana : http://192.168.1.10:3000 (admin/admin)\n# Configuration > Data Sources > Add > Prometheus\n# URL : http://localhost:9090 > Save & Test", commentaire: "Connecter Prometheus comme datasource" },
          { os: "linux", cmd: "# Dashboards > Import > ID : 1860 > Load > sélectionner datasource > Import", commentaire: "Importer le dashboard Node Exporter Full" },
          { os: "linux", cmd: "# Panel CPU > Edit > Alert > Create alert rule\n# Condition : avg() > 80 pendant 2 minutes", commentaire: "Créer une alerte CPU > 80%" }
        ],
        erreurs_courantes: [
          { symptome: "Grafana : Data source is not working", cause: "Prometheus non démarré", solution: "curl http://localhost:9090/-/healthy pour vérifier" }
        ]
      }
    ],
    checklist: [
      "http://192.168.1.10:9090/targets : node_exporter UP en vert",
      "Grafana accessible sur http://192.168.1.10:3000",
      "Datasource Prometheus : Data source is working",
      "Dashboard 1860 importé — panneaux CPU, RAM, disque visibles",
      "Alerte CPU créée dans Grafana Alerting"
    ],
    tags: ["grafana", "prometheus", "node-exporter", "supervision", "linux", "alertes", "monitoring"],
    date_ajout: "2026-06-26",
    source: "École"
  },

  {
    id: 44,
    titre: "Netdata — supervision temps réel avec alertes et streaming",
    categorie: "supervision",
    niveau: "débutant",
    duree: 45,
    description: "Installer Netdata pour une supervision temps réel à la seconde. Configurer une alerte personnalisée RAM et activer le streaming vers un noeud parent centralisateur.",
    objectifs: [
      "Installer Netdata via le script officiel",
      "Explorer le dashboard temps réel",
      "Configurer une alerte personnalisée RAM",
      "Activer le streaming vers un noeud parent",
      "Comparer avec Prometheus/Grafana"
    ],
    prerequis: [
      { type: "vm", nom: "VM Ubuntu 22.04 ou Debian 12 avec accès Internet" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer Netdata et explorer le dashboard",
        contexte: "Netdata s'installe via un script universel et expose son dashboard sur le port 19999.",
        commandes: [
          { os: "linux", cmd: "wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/kickstart.sh\nsudo sh /tmp/netdata-kickstart.sh --stable-channel --disable-telemetry", commentaire: "Installer Netdata" },
          { os: "linux", cmd: "sudo systemctl status netdata\ncurl http://localhost:19999/api/v1/info", commentaire: "Vérifier que Netdata tourne sur le port 19999" },
          { os: "linux", cmd: "sudo apt install stress-ng -y && stress-ng --cpu 2 --timeout 30s", commentaire: "Générer une charge CPU visible dans le dashboard" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Alerte personnalisée et streaming",
        contexte: "On crée une alerte RAM dans health.d/ et on configure le streaming parent/enfant.",
        commandes: [
          { os: "linux", cmd: "sudo nano /etc/netdata/health.d/custom_ram.conf", commentaire: "Créer l'alerte RAM" },
          { os: "linux", cmd: "# Contenu :\n# alarm: ram_usage_high\n# on: system.ram\n# lookup: average -1m percentage of used\n# warn: $this > 70\n# crit: $this > 90\n# info: RAM usage is high", commentaire: "Warning 70%, critique 90%" },
          { os: "linux", cmd: "sudo netdatacli reload-health", commentaire: "Recharger les alertes sans redémarrer" },
          { os: "linux", cmd: "# PARENT (/etc/netdata/stream.conf) :\n# [11111111-1111-1111-1111-111111111111]\n# enabled = yes\n# ENFANT (/etc/netdata/stream.conf) :\n# [stream]\n# enabled = yes\n# destination = 192.168.1.10:19999\n# api key = 11111111-1111-1111-1111-111111111111\nsudo systemctl restart netdata", commentaire: "Configurer le streaming parent/enfant" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "http://192.168.1.10:19999 affiche le dashboard",
      "stress-ng visible dans les graphiques CPU",
      "Alerte ram_usage_high dans health.d/",
      "netdatacli reload-health sans erreur",
      "Enfant visible dans le dashboard du parent"
    ],
    tags: ["netdata", "supervision", "monitoring", "alertes", "streaming", "temps-reel"],
    date_ajout: "2026-06-26",
    source: "École"
  }
];
