/* ============================================================
   TP & LABS IT — data.js
   Catégories + Labs complets
   ============================================================ */

const CATEGORIES = {
  reseau:         { label: "Réseau & Infrastructure",       couleur: "#3B82F6", icone: "🌐" },
  securite:       { label: "Sécurité - Cyber",              couleur: "#EF4444", icone: "🔐" },
  systemes:       { label: "Systèmes (Linux · Windows)",    couleur: "#10B981", icone: "🖥️" },
  virtualisation: { label: "Virtualisation",                couleur: "#8B5CF6", icone: "📦" },
  automatisation: { label: "Automatisation & IaC & Docker", couleur: "#F59E0B", icone: "⚙️" },
  sauvegardes:    { label: "Sauvegardes & PRA",             couleur: "#06B6D4", icone: "💾" },
  supervision:    { label: "Supervision",                   couleur: "#84CC16", icone: "📊" },
  slam:           { label: "SLAM",                          couleur: "#EC4899", icone: "💻" },
  projets:        { label: "Projets & Veille",              couleur: "#F97316", icone: "🚀" }
};

const LABS = [

  /* ──────────────────────────────────────────────────────
     TP 1 — Réseau : VLAN + Trunk 802.1Q sur GNS3
  ────────────────────────────────────────────────────── */
  {
    id: 1,
    titre: "Configuration VLAN et trunk 802.1Q sur GNS3",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 90,
    description: "Mettre en place une segmentation réseau avec deux VLANs (10 et 20) et un port trunk entre deux switches Cisco IOSv dans GNS3. On configure les ports d'accès, le trunk 802.1Q et on vérifie l'isolation complète entre VLANs.",
    objectifs: [
      "Créer et nommer les VLANs 10 (ADMIN) et 20 (PROD) sur deux switches",
      "Configurer les ports d'accès avec le bon VLAN natif",
      "Établir un port trunk 802.1Q entre SW1 et SW2",
      "Vérifier l'isolation des VLANs par des ping tests croisés",
      "Comprendre la propagation des VLANs via le trunking"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+", lien: "https://gns3.com" },
      { type: "vm",       nom: "Cisco IOSv 15.x (image .qcow2)" },
      { type: "logiciel", nom: "GNS3 VM (VMware ou VirtualBox)" },
      { type: "reseau",   nom: "Interface hôte dans le range 192.168.1.0/24" }
    ],
    schema_reseau: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- SW1 -->
  <rect x="180" y="110" width="80" height="60" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="220" y="138" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="bold">SW1</text>
  <text x="220" y="155" text-anchor="middle" fill="#78716C" font-size="9">IOSv</text>
  <!-- SW2 -->
  <rect x="340" y="110" width="80" height="60" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="380" y="138" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="bold">SW2</text>
  <text x="380" y="155" text-anchor="middle" fill="#78716C" font-size="9">IOSv</text>
  <!-- Trunk -->
  <line x1="260" y1="140" x2="340" y2="140" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
  <line x1="340" y1="140" x2="260" y2="140" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
  <text x="300" y="128" text-anchor="middle" fill="#F59E0B" font-size="9">TRUNK 802.1Q</text>
  <!-- PCs VLAN 10 -->
  <rect x="60" y="50" width="60" height="40" rx="6" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="90" y="67" text-anchor="middle" fill="#A8A29E" font-size="9">PC1</text>
  <text x="90" y="80" text-anchor="middle" fill="#3B82F6" font-size="8">VLAN 10</text>
  <rect x="60" y="190" width="60" height="40" rx="6" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="90" y="207" text-anchor="middle" fill="#A8A29E" font-size="9">PC2</text>
  <text x="90" y="220" text-anchor="middle" fill="#10B981" font-size="8">VLAN 20</text>
  <!-- PCs VLAN côté SW2 -->
  <rect x="480" y="50" width="60" height="40" rx="6" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="510" y="67" text-anchor="middle" fill="#A8A29E" font-size="9">PC3</text>
  <text x="510" y="80" text-anchor="middle" fill="#3B82F6" font-size="8">VLAN 10</text>
  <rect x="480" y="190" width="60" height="40" rx="6" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="510" y="207" text-anchor="middle" fill="#A8A29E" font-size="9">PC4</text>
  <text x="510" y="220" text-anchor="middle" fill="#10B981" font-size="8">VLAN 20</text>
  <!-- Liens PC → SW -->
  <line x1="120" y1="70" x2="180" y2="125" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="120" y1="210" x2="180" y2="155" stroke="#10B981" stroke-width="1.5"/>
  <line x1="480" y1="70" x2="420" y2="125" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="480" y1="210" x2="420" y2="155" stroke="#10B981" stroke-width="1.5"/>
  <!-- IPs -->
  <text x="90" y="100" text-anchor="middle" fill="#78716C" font-size="8">10.0.10.1/24</text>
  <text x="90" y="240" text-anchor="middle" fill="#78716C" font-size="8">10.0.20.1/24</text>
  <text x="510" y="100" text-anchor="middle" fill="#78716C" font-size="8">10.0.10.2/24</text>
  <text x="510" y="240" text-anchor="middle" fill="#78716C" font-size="8">10.0.20.2/24</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Préparer la topologie GNS3",
        contexte: "Avant toute configuration, on construit la topologie dans GNS3 : deux switches Cisco IOSv reliés entre eux (port trunk futur), et deux PCs de chaque côté (un par VLAN). Les PCs utilisent des VPCS intégrés à GNS3 pour simplifier.",
        commandes: [
          { os: "both", cmd: "# Démarrer tous les équipements dans GNS3\n# Clic droit → Start sur chaque nœud", commentaire: "Démarrage des VMs IOSv (peut prendre 30-60s)" }
        ],
        erreurs_courantes: [
          {
            symptome: "L'image IOSv ne se charge pas dans GNS3",
            cause: "L'image .qcow2 n'est pas correctement importée dans GNS3 ou la GNS3 VM n'est pas démarrée",
            solution: "Aller dans Edit → Preferences → Qemu → Qemu VMs et vérifier le chemin de l'image. S'assurer que GNS3 VM est en état 'running' dans VMware/VirtualBox."
          }
        ]
      },
      {
        titre: "Étape 2 — Créer les VLANs sur SW1",
        contexte: "On se connecte à SW1 via la console GNS3 et on crée les deux VLANs avec un nom explicite. La commande 'vlan database' est la méthode classique sur IOSv, mais on peut aussi le faire en mode config global.",
        commandes: [
          { os: "linux", cmd: "SW1# configure terminal\nSW1(config)# vlan 10\nSW1(config-vlan)# name ADMIN\nSW1(config-vlan)# exit\nSW1(config)# vlan 20\nSW1(config-vlan)# name PROD\nSW1(config-vlan)# exit", commentaire: "Créer VLAN 10 (ADMIN) et VLAN 20 (PROD)" },
          { os: "linux", cmd: "SW1# show vlan brief", commentaire: "Vérifier que les deux VLANs apparaissent avec leur nom" }
        ],
        erreurs_courantes: [
          {
            symptome: "Les VLANs disparaissent après redémarrage",
            cause: "La configuration n'a pas été sauvegardée avec 'write memory'",
            solution: "Toujours terminer par SW1# write memory ou SW1# copy running-config startup-config"
          }
        ]
      },
      {
        titre: "Étape 3 — Assigner les ports d'accès sur SW1",
        contexte: "Les ports reliés aux PCs sont configurés en mode 'access' avec leur VLAN respectif. Un port access n'appartient qu'à un seul VLAN et retire l'en-tête 802.1Q des trames avant de les transmettre.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW1(config-if)# no shutdown\nSW1(config-if)# exit", commentaire: "Port vers PC1 — VLAN 10 (ADMIN)" },
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/2\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 20\nSW1(config-if)# no shutdown\nSW1(config-if)# exit", commentaire: "Port vers PC2 — VLAN 20 (PROD)" },
          { os: "linux", cmd: "SW1# show interfaces GigabitEthernet0/1 switchport", commentaire: "Vérifier la config du port : doit afficher 'Access Mode VLAN: 10'" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Configurer le port trunk entre SW1 et SW2",
        contexte: "Le port trunk transporte les trames de tous les VLANs entre les deux switches. Il ajoute un tag 802.1Q (4 octets) dans l'en-tête Ethernet pour identifier le VLAN d'appartenance. On active l'encapsulation dot1q avant de passer en mode trunk.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/3\nSW1(config-if)# switchport trunk encapsulation dot1q\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan 10,20\nSW1(config-if)# no shutdown\nSW1(config-if)# exit", commentaire: "Trunk 802.1Q — autorise VLAN 10 et 20 uniquement" },
          { os: "linux", cmd: "# Répéter la même config sur SW2 (interface GigabitEthernet0/3)", commentaire: "Le trunk doit être configuré des deux côtés" },
          { os: "linux", cmd: "SW1# show interfaces trunk", commentaire: "Vérifier : port en mode 'trunk', VLANs 10,20 dans 'VLANs allowed and active'" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le port trunk affiche 'not trunking' dans show interfaces trunk",
            cause: "L'encapsulation n'est pas négociée (DTP peut échouer si un côté est en mode access)",
            solution: "Forcer le mode trunk des deux côtés avec 'switchport mode trunk' sans laisser DTP négocier. Vérifier aussi que 'switchport trunk encapsulation dot1q' est appliqué avant 'switchport mode trunk'."
          }
        ]
      },
      {
        titre: "Étape 5 — Configurer les IPs des PCs et tester",
        contexte: "On assigne des adresses IP aux VPCS GNS3 et on effectue des ping tests pour valider l'isolation entre VLANs et la connectivité au sein d'un même VLAN à travers le trunk.",
        commandes: [
          { os: "linux", cmd: "# Sur PC1 (VPCS GNS3)\nPC1> ip 10.0.10.1 255.255.255.0\nPC1> ping 10.0.10.2", commentaire: "PC1 → PC3 (même VLAN 10, doit répondre ✓)" },
          { os: "linux", cmd: "PC1> ping 10.0.20.1", commentaire: "PC1 → PC2 (VLAN différent, doit échouer ✗ — isolation OK)" },
          { os: "linux", cmd: "SW1# show mac address-table", commentaire: "Observer la table MAC et les VLANs associés à chaque entrée" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le ping entre PCs du même VLAN échoue",
            cause: "L'interface du port trunk sur SW2 n'est pas configurée ou le VLAN n'est pas dans la liste allowed",
            solution: "Vérifier 'show interfaces trunk' sur les deux switches. S'assurer que les VLANs 10 et 20 apparaissent dans la colonne 'VLANs allowed and active in management domain'."
          }
        ]
      }
    ],
    checklist: [
      "Les VLAN 10 (ADMIN) et 20 (PROD) apparaissent dans 'show vlan brief' sur les deux switches",
      "Les ports access sont correctement assignés (vérifiable via 'show interfaces switchport')",
      "Le port trunk est actif et porte les VLANs 10 et 20 ('show interfaces trunk')",
      "PC1 ↔ PC3 (VLAN 10) : ping fonctionnel à travers le trunk",
      "PC1 → PC2 (VLAN 10 → 20) : ping échoue — isolation confirmée"
    ],
    tags: ["vlan", "gns3", "cisco", "trunk", "802.1q", "iosv", "reseau"],
    date_ajout: "2026-01-15",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 2 — Systèmes Linux : Durcissement SSH + fail2ban
  ────────────────────────────────────────────────────── */
  {
    id: 2,
    titre: "Durcissement SSH + fail2ban sur Debian/Ubuntu",
    categorie: "systemes",
    niveau: "intermédiaire",
    duree: 60,
    description: "Sécuriser l'accès SSH d'un serveur Debian/Ubuntu : désactiver l'authentification par mot de passe, forcer l'authentification par clé publique, restreindre les utilisateurs autorisés, puis installer et configurer fail2ban pour bloquer automatiquement les tentatives de brute-force.",
    objectifs: [
      "Générer une paire de clés SSH Ed25519 et déployer la clé publique",
      "Durcir la configuration sshd_config (port, auth, utilisateurs)",
      "Installer et configurer fail2ban pour protéger le service SSH",
      "Tester la connexion par clé et le blocage automatique par fail2ban"
    ],
    prerequis: [
      { type: "vm",      nom: "VM Debian 12 ou Ubuntu 22.04 LTS" },
      { type: "reseau",  nom: "Accès SSH existant sur port 22" },
      { type: "logiciel", nom: "Client SSH sur machine hôte (OpenSSH, PuTTY)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Générer la paire de clés SSH Ed25519",
        contexte: "Ed25519 est l'algorithme de signature recommandé aujourd'hui : plus court, plus rapide et plus sécurisé que RSA 2048. On génère la paire sur la machine cliente (votre poste), pas sur le serveur. La clé privée ne quitte jamais votre machine.",
        commandes: [
          { os: "linux", cmd: "ssh-keygen -t ed25519 -C \"admin@tp-ssh\" -f ~/.ssh/id_ed25519_tp", commentaire: "Génère la paire de clés — entrer une passphrase forte" },
          { os: "windows", cmd: "ssh-keygen -t ed25519 -C \"admin@tp-ssh\" -f %USERPROFILE%\\.ssh\\id_ed25519_tp", commentaire: "Même commande sous Windows (PowerShell ou Git Bash)" },
          { os: "linux", cmd: "cat ~/.ssh/id_ed25519_tp.pub", commentaire: "Afficher la clé PUBLIQUE à copier vers le serveur" }
        ],
        erreurs_courantes: [
          {
            symptome: "Erreur 'No such file or directory' pour ~/.ssh/",
            cause: "Le répertoire .ssh n'existe pas encore",
            solution: "mkdir -p ~/.ssh && chmod 700 ~/.ssh"
          }
        ]
      },
      {
        titre: "Étape 2 — Copier la clé publique sur le serveur",
        contexte: "On dépose la clé publique dans le fichier authorized_keys du compte cible sur le serveur. La commande ssh-copy-id automatise cela proprement. Si elle n'est pas disponible, on le fait manuellement.",
        commandes: [
          { os: "linux", cmd: "ssh-copy-id -i ~/.ssh/id_ed25519_tp.pub user@192.168.1.10", commentaire: "Copie automatique — requiert encore le mot de passe une dernière fois" },
          { os: "linux", cmd: "# Méthode manuelle si ssh-copy-id indisponible :\ncat ~/.ssh/id_ed25519_tp.pub | ssh user@192.168.1.10 \\\n  \"mkdir -p ~/.ssh && chmod 700 ~/.ssh && \\\n   cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys\"", commentaire: "Alternative manuelle équivalente" },
          { os: "linux", cmd: "ssh -i ~/.ssh/id_ed25519_tp user@192.168.1.10", commentaire: "Test de connexion par clé — doit fonctionner sans mot de passe (ou avec passphrase)" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Durcir sshd_config",
        contexte: "Une fois la connexion par clé confirmée, on durcit la configuration du serveur SSH. IMPORTANT : ne jamais fermer la session active pendant la modification — ouvrir une deuxième session de test avant de valider.",
        commandes: [
          { os: "linux", cmd: "sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak", commentaire: "Sauvegarde obligatoire avant toute modification" },
          { os: "linux", cmd: "sudo nano /etc/ssh/sshd_config", commentaire: "Éditer la configuration — voir les paramètres ci-dessous" },
          { os: "linux", cmd: "# Paramètres à modifier/vérifier dans sshd_config :\nPort 2222\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nLoginGraceTime 20\nAllowUsers votre_user", commentaire: "Coller/modifier ces lignes dans le fichier sshd_config" },
          { os: "linux", cmd: "sudo sshd -t", commentaire: "Vérifier la syntaxe AVANT de recharger (pas d'erreur = OK)" },
          { os: "linux", cmd: "sudo systemctl restart ssh", commentaire: "Appliquer la configuration (Debian: 'ssh', Ubuntu: 'sshd')" },
          { os: "linux", cmd: "ssh -i ~/.ssh/id_ed25519_tp -p 2222 user@192.168.1.10", commentaire: "Tester la connexion sur le nouveau port" }
        ],
        erreurs_courantes: [
          {
            symptome: "Permission denied (publickey) après rechargement",
            cause: "La clé publique n'est pas dans authorized_keys, ou les permissions du fichier sont incorrectes",
            solution: "Sur le serveur : chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys. Vérifier aussi que la clé privée correspond bien à la publique déposée."
          },
          {
            symptome: "ssh: connect to host port 2222: Connection refused",
            cause: "Le firewall bloque le nouveau port ou sshd n'a pas redémarré correctement",
            solution: "sudo ufw allow 2222/tcp && sudo ufw reload. Vérifier avec: sudo systemctl status ssh"
          }
        ]
      },
      {
        titre: "Étape 4 — Installer et configurer fail2ban",
        contexte: "fail2ban surveille les logs système et bannit automatiquement les IPs après un certain nombre d'échecs d'authentification. On crée un fichier jail.local pour ne pas écraser la configuration par défaut lors des mises à jour.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install fail2ban -y", commentaire: "Installation de fail2ban" },
          { os: "linux", cmd: "sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local", commentaire: "Copier la config de base pour personnalisation locale" },
          { os: "linux", cmd: "sudo nano /etc/fail2ban/jail.local", commentaire: "Éditer jail.local — modifier la section [sshd]" },
          { os: "linux", cmd: "# Dans jail.local, section [sshd] :\n[sshd]\nenabled  = true\nport     = 2222\nfilter   = sshd\nlogpath  = /var/log/auth.log\nmaxretry = 3\nbantime  = 3600\nfindtime = 600", commentaire: "3 tentatives → ban 1h dans une fenêtre de 10min" },
          { os: "linux", cmd: "sudo systemctl enable fail2ban && sudo systemctl restart fail2ban", commentaire: "Activer au démarrage et relancer" },
          { os: "linux", cmd: "sudo fail2ban-client status sshd", commentaire: "Vérifier que la jail 'sshd' est active (Currently banned: 0)" }
        ],
        erreurs_courantes: [
          {
            symptome: "fail2ban.service: Control process exited with error code",
            cause: "Le fichier jail.local contient une erreur de syntaxe ou le logpath est incorrect",
            solution: "sudo fail2ban-client -t (test de config). Sur Ubuntu 22.04, le log peut être dans /var/log/auth.log ou /var/log/secure selon la distrib."
          }
        ]
      }
    ],
    checklist: [
      "Connexion SSH par clé Ed25519 fonctionnelle sur le port 2222",
      "Connexion par mot de passe rejetée (PasswordAuthentication no vérifié)",
      "Root login désactivé (PermitRootLogin no dans sshd_config)",
      "fail2ban actif avec jail sshd activée ('fail2ban-client status sshd' → OK)"
    ],
    tags: ["ssh", "fail2ban", "debian", "ubuntu", "securite", "hardening", "linux"],
    date_ajout: "2026-01-20",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 3 — Virtualisation : Proxmox — VM + Snapshot
  ────────────────────────────────────────────────────── */
  {
    id: 3,
    titre: "Création et snapshot d'une VM sous Proxmox VE",
    categorie: "virtualisation",
    niveau: "débutant",
    duree: 45,
    description: "Prendre en main Proxmox VE : créer une machine virtuelle Debian depuis une ISO, configurer les ressources, démarrer la VM, effectuer l'installation de base, puis réaliser un snapshot pour capturer l'état initial de la machine.",
    objectifs: [
      "Naviguer dans l'interface web Proxmox VE et comprendre l'arborescence",
      "Créer une VM avec ressources adaptées (RAM, CPU, disque, réseau)",
      "Installer Debian 12 sur la VM depuis une ISO uploadée",
      "Créer un snapshot de la VM installée et le restaurer"
    ],
    prerequis: [
      { type: "logiciel", nom: "Proxmox VE 8.x installé", lien: "https://proxmox.com/en/downloads" },
      { type: "reseau",   nom: "Accès à l'interface web https://IP-PROXMOX:8006" },
      { type: "logiciel", nom: "ISO Debian 12 netinst", lien: "https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Uploader l'ISO dans Proxmox",
        contexte: "Avant de créer la VM, il faut rendre l'ISO disponible dans le stockage Proxmox. On peut l'uploader depuis l'interface web ou directement via wget en ligne de commande sur le nœud Proxmox.",
        commandes: [
          { os: "linux", cmd: "# Via CLI sur le nœud Proxmox (SSH) :\nwget -P /var/lib/vz/template/iso/ \\\n  https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-12.5.0-amd64-netinst.iso", commentaire: "Téléchargement direct de l'ISO sur le nœud — plus rapide que l'upload" },
          { os: "linux", cmd: "ls -lh /var/lib/vz/template/iso/", commentaire: "Vérifier que l'ISO est bien présente" }
        ],
        erreurs_courantes: [
          {
            symptome: "L'ISO n'apparaît pas dans la liste lors de la création de VM",
            cause: "Le stockage 'local' n'a pas le type 'ISO image' activé",
            solution: "Dans Proxmox → Datacenter → Storage → local → Edit → vérifier que 'ISO image' est coché dans Content."
          }
        ]
      },
      {
        titre: "Étape 2 — Créer la VM via l'interface web",
        contexte: "On crée la VM depuis l'interface web Proxmox en suivant l'assistant. L'ID de la VM (VMID) est attribué automatiquement ou peut être choisi. On configure les ressources minimales pour une installation Debian légère.",
        commandes: [
          { os: "both", cmd: "# Paramètres recommandés pour la VM Debian :\n# Général : Nom = 'debian-tp', VMID = 100\n# OS : ISO = debian-12.5.0..., Guest OS = Linux 6.x\n# Système : BIOS = SeaBIOS, Machine = q35\n# Disques : Bus = VirtIO, Taille = 20G, Storage = local-lvm\n# CPU : Sockets = 1, Cores = 2, Type = host\n# Mémoire : 2048 MB\n# Réseau : Bridge = vmbr0, Modèle = VirtIO", commentaire: "Suivre l'assistant Create VM avec ces paramètres" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Installer Debian sur la VM",
        contexte: "On démarre la VM et on suit l'installateur Debian standard. Pour un TP, on choisit l'installation minimale sans environnement graphique. Décocher toutes les tâches tasksel sauf 'SSH server' et 'standard system utilities'.",
        commandes: [
          { os: "linux", cmd: "# Après l'installation, depuis le nœud Proxmox :\nqm status 100", commentaire: "Vérifier l'état de la VM (100 = VMID)" },
          { os: "linux", cmd: "qm config 100", commentaire: "Afficher la configuration complète de la VM" },
          { os: "linux", cmd: "# Depuis la VM Debian après boot :\nip a show\nhostname -I", commentaire: "Vérifier que la VM a bien une IP via DHCP" }
        ],
        erreurs_courantes: [
          {
            symptome: "La VM n'obtient pas d'adresse IP après installation",
            cause: "Le bridge vmbr0 n'est pas connecté à l'interface physique du nœud Proxmox",
            solution: "Sur le nœud Proxmox → Réseau → vmbr0 → vérifier que le Bridge port pointe vers l'interface physique (ex: eno1, eth0). Redémarrer le réseau : ifreload -a"
          },
          {
            symptome: "Écran noir après démarrage de la VM",
            cause: "Le pilote graphique n'est pas chargé, problème de machine type",
            solution: "Dans la config VM → Hardware → Display → changer en 'VirtIO-GPU' ou 'std'. Redémarrer la VM."
          }
        ]
      },
      {
        titre: "Étape 4 — Créer un snapshot de la VM",
        contexte: "Un snapshot capture l'état du disque (et optionnellement de la RAM) de la VM à un instant T. C'est essentiel pour pouvoir revenir à un état connu avant des opérations risquées. Sur Proxmox, les snapshots de VMs avec disques qcow2 ou raw sur LVM-thin sont instantanés.",
        commandes: [
          { os: "linux", cmd: "# Via CLI Proxmox :\nqm snapshot 100 \"post-install\" --description \"Debian 12 installée, SSH actif\" --vmstate 0", commentaire: "Crée un snapshot sans état RAM (plus rapide, VM peut être allumée)" },
          { os: "linux", cmd: "qm listsnapshot 100", commentaire: "Lister les snapshots de la VM 100" },
          { os: "linux", cmd: "# Pour restaurer le snapshot :\nqm rollback 100 post-install", commentaire: "Restaurer la VM à l'état du snapshot (la VM doit être arrêtée)" },
          { os: "linux", cmd: "# Supprimer un snapshot :\nqm delsnapshot 100 post-install", commentaire: "Supprimer le snapshot (libère l'espace disque)" }
        ],
        erreurs_courantes: [
          {
            symptome: "Erreur 'storage does not support snapshots'",
            cause: "Le stockage utilisé (ex: local, dir) ne supporte pas les snapshots — seul LVM-thin ou ZFS les supportent nativement",
            solution: "Migrer le disque de la VM vers un stockage LVM-thin (local-lvm dans Proxmox). Datacenter → Storage → Ajouter LVM-thin si pas déjà configuré."
          }
        ]
      }
    ],
    checklist: [
      "La VM Debian 12 est créée et apparaît dans l'arborescence Proxmox",
      "La VM démarre et répond au ping depuis le réseau local",
      "La connexion SSH à la VM fonctionne",
      "Un snapshot 'post-install' est visible via 'qm listsnapshot 100'"
    ],
    tags: ["proxmox", "vm", "virtualisation", "debian", "snapshot", "qm", "kvm"],
    date_ajout: "2026-01-25",
    source: "Personnel"
  },

  /* ──────────────────────────────────────────────────────
     TP 4 — Réseau : Routage statique + Router-on-a-Stick
  ────────────────────────────────────────────────────── */
  {
    id: 4,
    titre: "Routage statique et Router-on-a-Stick sur GNS3",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 90,
    description: "Configurer le routage statique entre trois réseaux distincts, puis mettre en place un Router-on-a-Stick pour permettre la communication inter-VLAN via une seule interface physique du routeur découpée en sous-interfaces 802.1Q.",
    objectifs: [
      "Comprendre et configurer des routes statiques IPv4 sur IOS",
      "Maîtriser la notion de route par défaut (default route)",
      "Créer des sous-interfaces (subinterfaces) 802.1Q sur un routeur Cisco",
      "Permettre la communication entre VLAN 10 et VLAN 20 via le routeur",
      "Vérifier le routage avec show ip route et des ping tests croisés"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+", lien: "https://gns3.com" },
      { type: "vm",       nom: "Cisco IOSv 15.x (routeur)" },
      { type: "vm",       nom: "Cisco IOSv-L2 (switch)" },
      { type: "reseau",   nom: "Notions de base en adressage IPv4 et masques CIDR" }
    ],
    schema_reseau: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- Routeur R1 -->
  <ellipse cx="320" cy="140" rx="44" ry="30" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="320" y="136" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R1</text>
  <text x="320" y="151" text-anchor="middle" fill="#78716C" font-size="8">IOSv</text>
  <!-- Switch SW1 -->
  <rect x="220" y="220" width="70" height="45" rx="6" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="255" y="240" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">SW1</text>
  <text x="255" y="256" text-anchor="middle" fill="#78716C" font-size="8">IOSv-L2</text>
  <!-- PC VLAN 10 -->
  <rect x="60" y="220" width="60" height="40" rx="6" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="90" y="237" text-anchor="middle" fill="#A8A29E" font-size="9">PC1</text>
  <text x="90" y="250" text-anchor="middle" fill="#3B82F6" font-size="8">VLAN 10</text>
  <text x="90" y="275" text-anchor="middle" fill="#78716C" font-size="7">10.0.10.10/24</text>
  <!-- PC VLAN 20 -->
  <rect x="360" y="220" width="60" height="40" rx="6" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="390" y="237" text-anchor="middle" fill="#A8A29E" font-size="9">PC2</text>
  <text x="390" y="250" text-anchor="middle" fill="#10B981" font-size="8">VLAN 20</text>
  <text x="390" y="275" text-anchor="middle" fill="#78716C" font-size="7">10.0.20.10/24</text>
  <!-- Réseau externe -->
  <rect x="490" y="115" width="80" height="50" rx="6" fill="#1C1917" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="530" y="137" text-anchor="middle" fill="#8B5CF6" font-size="9">Réseau</text>
  <text x="530" y="150" text-anchor="middle" fill="#8B5CF6" font-size="9">externe</text>
  <text x="530" y="162" text-anchor="middle" fill="#78716C" font-size="7">192.168.100.0/24</text>
  <!-- Liens -->
  <line x1="276" y1="148" x2="255" y2="220" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="248" y="188" text-anchor="middle" fill="#F59E0B" font-size="8">Gi0/0</text>
  <text x="248" y="198" text-anchor="middle" fill="#78716C" font-size="7">.1Q trunk</text>
  <line x1="120" y1="240" x2="220" y2="240" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="310" y1="240" x2="360" y2="240" stroke="#10B981" stroke-width="1.5"/>
  <line x1="364" y1="140" x2="490" y2="140" stroke="#8B5CF6" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="428" y="132" text-anchor="middle" fill="#8B5CF6" font-size="8">Gi0/1</text>
  <!-- Subinterfaces label -->
  <text x="180" y="118" text-anchor="middle" fill="#F59E0B" font-size="8">Gi0/0.10 → 10.0.10.1/24</text>
  <text x="180" y="130" text-anchor="middle" fill="#10B981" font-size="8">Gi0/0.20 → 10.0.20.1/24</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Planifier l'adressage et construire la topologie",
        contexte: "Avant de toucher à la CLI, on planifie l'adressage. Le routeur R1 aura deux sous-interfaces sur Gi0/0 (une par VLAN) et une interface Gi0/1 vers le réseau externe. Le switch SW1 est configuré avec un trunk vers R1 et des ports access pour les PCs.",
        commandes: [
          { os: "both", cmd: "# Plan d'adressage :\n# VLAN 10 (ADMIN) : 10.0.10.0/24  — Gateway : 10.0.10.1  (R1 Gi0/0.10)\n# VLAN 20 (PROD)  : 10.0.20.0/24  — Gateway : 10.0.20.1  (R1 Gi0/0.20)\n# Réseau ext.     : 192.168.100.0/24 — R1 Gi0/1 : 192.168.100.1\n# PC1 : 10.0.10.10/24 gw 10.0.10.1\n# PC2 : 10.0.20.10/24 gw 10.0.20.1", commentaire: "Tableau d'adressage — à garder sous la main pendant tout le TP" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Configurer le switch SW1 (trunk + access)",
        contexte: "Le switch doit créer les VLANs, configurer le port vers R1 en trunk et les ports vers les PCs en mode access. C'est la même logique que le TP VLAN précédent.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# vlan 10\nSW1(config-vlan)# name ADMIN\nSW1(config-vlan)# exit\nSW1(config)# vlan 20\nSW1(config-vlan)# name PROD\nSW1(config-vlan)# exit", commentaire: "Créer les VLANs 10 et 20" },
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# switchport trunk encapsulation dot1q\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan 10,20\nSW1(config-if)# no shutdown", commentaire: "Port trunk vers R1 — transporte les deux VLANs" },
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/2\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW1(config-if)# no shutdown\nSW1(config)# interface GigabitEthernet0/3\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 20\nSW1(config-if)# no shutdown", commentaire: "Ports access : Gi0/2 → VLAN 10, Gi0/3 → VLAN 20" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Configurer les sous-interfaces Router-on-a-Stick sur R1",
        contexte: "Le principe du Router-on-a-Stick : une seule interface physique Gi0/0 est découpée en sous-interfaces logiques, chacune associée à un VLAN via l'encapsulation dot1q. L'interface physique elle-même n'a pas d'IP — ce sont les sous-interfaces qui en ont une.",
        commandes: [
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/0\nR1(config-if)# no shutdown\nR1(config-if)# exit", commentaire: "Activer l'interface physique SANS IP — juste no shutdown" },
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/0.10\nR1(config-subif)# encapsulation dot1Q 10\nR1(config-subif)# ip address 10.0.10.1 255.255.255.0\nR1(config-subif)# no shutdown\nR1(config-subif)# exit", commentaire: "Sous-interface VLAN 10 — gateway des PCs du VLAN 10" },
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/0.20\nR1(config-subif)# encapsulation dot1Q 20\nR1(config-subif)# ip address 10.0.20.1 255.255.255.0\nR1(config-subif)# no shutdown\nR1(config-subif)# exit", commentaire: "Sous-interface VLAN 20 — gateway des PCs du VLAN 20" },
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip address 192.168.100.1 255.255.255.0\nR1(config-if)# no shutdown", commentaire: "Interface vers réseau externe" },
          { os: "linux", cmd: "R1# show ip interface brief", commentaire: "Vérifier que toutes les interfaces sont 'up/up' et ont leurs IPs" }
        ],
        erreurs_courantes: [
          {
            symptome: "Les sous-interfaces sont en 'down/down' même après no shutdown",
            cause: "L'interface physique parente (Gi0/0) n'est pas activée avec no shutdown",
            solution: "Aller sur R1(config)# interface GigabitEthernet0/0 et taper no shutdown. Les sous-interfaces héritent de l'état de l'interface physique."
          },
          {
            symptome: "Erreur 'encapsulation command not available'",
            cause: "La commande encapsulation dot1Q doit être tapée sur la sous-interface, pas sur l'interface physique",
            solution: "Vérifier que tu es bien dans R1(config-subif)# (sous-interface) et pas dans R1(config-if)# (interface physique)."
          }
        ]
      },
      {
        titre: "Étape 4 — Configurer le routage statique",
        contexte: "Les routes connectées (directly connected) sont automatiquement dans la table de routage. On ajoute des routes statiques pour des réseaux distants non directement connectés, et une route par défaut (0.0.0.0/0) pour le trafic vers Internet.",
        commandes: [
          { os: "linux", cmd: "R1# show ip route", commentaire: "Observer les routes 'C' (connected) déjà présentes pour les 3 réseaux" },
          { os: "linux", cmd: "# Exemple : ajouter une route statique vers un réseau distant\n# (si un deuxième routeur R2 est présent avec le réseau 172.16.0.0/24)\nR1(config)# ip route 172.16.0.0 255.255.255.0 192.168.100.2", commentaire: "Route statique : pour atteindre 172.16.0.0/24, passer par 192.168.100.2 (next-hop)" },
          { os: "linux", cmd: "R1(config)# ip route 0.0.0.0 0.0.0.0 192.168.100.254", commentaire: "Route par défaut — tout trafic sans route connue passe par 192.168.100.254" },
          { os: "linux", cmd: "R1# show ip route static", commentaire: "Afficher uniquement les routes statiques (marquées 'S' dans la table)" }
        ],
        erreurs_courantes: [
          {
            symptome: "La route statique n'apparaît pas dans 'show ip route'",
            cause: "L'interface next-hop n'est pas active (down), la route n'est donc pas installée",
            solution: "Vérifier l'état de l'interface vers le next-hop avec 'show ip interface brief'. Si elle est down, faire no shutdown."
          }
        ]
      },
      {
        titre: "Étape 5 — Configurer les PCs et tester le routage inter-VLAN",
        contexte: "On assigne les IPs aux VPCS et on teste la connectivité. Le test clé est le ping entre PC1 (VLAN 10) et PC2 (VLAN 20) — le trafic doit monter jusqu'à R1 via le trunk, être routé, puis redescendre vers le VLAN de destination.",
        commandes: [
          { os: "linux", cmd: "# Sur PC1 (VPCS) :\nPC1> ip 10.0.10.10 255.255.255.0 10.0.10.1\nPC1> ping 10.0.10.1", commentaire: "Test gateway VLAN 10 — doit répondre (même VLAN, accès direct)" },
          { os: "linux", cmd: "PC1> ping 10.0.20.10", commentaire: "Test inter-VLAN PC1 → PC2 — doit répondre via R1 ✓" },
          { os: "linux", cmd: "PC1> ping 192.168.100.1", commentaire: "Test vers réseau externe — doit répondre via routage ✓" },
          { os: "linux", cmd: "R1# show ip route\nR1# show arp", commentaire: "Vérifier la table de routage et les entrées ARP des gateways" },
          { os: "linux", cmd: "R1# debug ip packet\n# (désactiver après test : undebug all)", commentaire: "Observer le routage paquet par paquet — attention verbeux" }
        ],
        erreurs_courantes: [
          {
            symptome: "Ping inter-VLAN échoue (PC1 → PC2)",
            cause: "Les PCs n'ont pas de gateway configurée, ou la gateway pointe vers la mauvaise IP",
            solution: "Vérifier sur chaque VPCS avec 'show ip'. La gateway de PC1 doit être 10.0.10.1, celle de PC2 doit être 10.0.20.1 — l'IP de la sous-interface correspondante sur R1."
          }
        ]
      }
    ],
    checklist: [
      "show ip interface brief sur R1 : Gi0/0.10, Gi0/0.20 et Gi0/1 sont 'up/up' avec leurs IPs",
      "show vlan brief sur SW1 : VLAN 10 et 20 existent avec les bons ports",
      "show interfaces trunk sur SW1 : port trunk actif vers R1 avec VLAN 10,20",
      "Ping PC1 → gateway 10.0.10.1 : OK",
      "Ping PC1 → PC2 (inter-VLAN 10.0.20.10) : OK via R1",
      "show ip route sur R1 : routes C et S visibles correctement"
    ],
    tags: ["routage", "statique", "router-on-a-stick", "subinterface", "inter-vlan", "cisco", "gns3", "dot1q"],
    date_ajout: "2026-02-01",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 5 — Réseau : OSPF mono-zone (Area 0)
  ────────────────────────────────────────────────────── */
  {
    id: 5,
    titre: "OSPF mono-zone (Area 0) entre 3 routeurs Cisco",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 100,
    description: "Mettre en place un routage dynamique OSPF en area 0 sur une topologie de 3 routeurs interconnectés. On configure les annonces réseau, observe l'élection DR/BDR, analyse les LSA échangés et vérifie la convergence automatique en cas de panne.",
    objectifs: [
      "Activer OSPF sur chaque routeur avec un process-id et un router-id unique",
      "Annoncer les réseaux locaux via la commande network avec wildcard mask",
      "Observer l'élection DR/BDR sur un segment multi-accès",
      "Analyser la table OSPF et la table de routage résultante",
      "Simuler une panne de lien et observer la reconvergence OSPF"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+", lien: "https://gns3.com" },
      { type: "vm",       nom: "3x Cisco IOSv 15.x" },
      { type: "reseau",   nom: "Maîtrise du routage statique (TP précédent recommandé)" },
      { type: "reseau",   nom: "Comprendre les wildcard masks (inverse du masque subnet)" }
    ],
    schema_reseau: `<svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- R1 -->
  <ellipse cx="160" cy="140" rx="44" ry="30" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="160" y="136" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R1</text>
  <text x="160" y="151" text-anchor="middle" fill="#78716C" font-size="8">RID 1.1.1.1</text>
  <!-- R2 -->
  <ellipse cx="380" cy="60" rx="44" ry="30" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="380" y="56" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R2</text>
  <text x="380" y="71" text-anchor="middle" fill="#78716C" font-size="8">RID 2.2.2.2</text>
  <!-- R3 -->
  <ellipse cx="380" cy="220" rx="44" ry="30" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="380" y="216" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R3</text>
  <text x="380" y="231" text-anchor="middle" fill="#78716C" font-size="8">RID 3.3.3.3</text>
  <!-- Liens inter-routeurs -->
  <line x1="204" y1="122" x2="336" y2="72" stroke="#F59E0B" stroke-width="2"/>
  <text x="255" y="85" text-anchor="middle" fill="#A8A29E" font-size="8">10.0.12.0/30</text>
  <line x1="204" y1="158" x2="336" y2="208" stroke="#F59E0B" stroke-width="2"/>
  <text x="255" y="200" text-anchor="middle" fill="#A8A29E" font-size="8">10.0.13.0/30</text>
  <line x1="380" y1="90" x2="380" y2="190" stroke="#F59E0B" stroke-width="2"/>
  <text x="415" y="145" text-anchor="middle" fill="#A8A29E" font-size="8">10.0.23.0/30</text>
  <!-- Réseaux LAN -->
  <rect x="30" y="115" width="60" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="60" y="130" text-anchor="middle" fill="#3B82F6" font-size="8">LAN R1</text>
  <text x="60" y="142" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.0/24</text>
  <line x1="116" y1="140" x2="90" y2="132" stroke="#3B82F6" stroke-width="1.5"/>
  <rect x="455" y="35" width="60" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="485" y="50" text-anchor="middle" fill="#10B981" font-size="8">LAN R2</text>
  <text x="485" y="62" text-anchor="middle" fill="#78716C" font-size="7">192.168.2.0/24</text>
  <line x1="424" y1="60" x2="455" y2="52" stroke="#10B981" stroke-width="1.5"/>
  <rect x="455" y="195" width="60" height="35" rx="5" fill="#1C1917" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="485" y="210" text-anchor="middle" fill="#8B5CF6" font-size="8">LAN R3</text>
  <text x="485" y="222" text-anchor="middle" fill="#78716C" font-size="7">192.168.3.0/24</text>
  <line x1="424" y1="220" x2="455" y2="212" stroke="#8B5CF6" stroke-width="1.5"/>
  <!-- OSPF Area label -->
  <rect x="150" y="10" width="130" height="24" rx="4" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" stroke-width="1"/>
  <text x="215" y="26" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="bold">OSPF Area 0 (Backbone)</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Configurer les interfaces et l'adressage IP",
        contexte: "On commence par assigner les IPs sur toutes les interfaces avant d'activer OSPF. Les liens inter-routeurs utilisent des /30 (2 hôtes utiles) pour économiser les adresses. Chaque routeur a aussi une interface loopback qui servira de Router-ID stable.",
        commandes: [
          { os: "linux", cmd: "! ── R1 ──\nR1(config)# interface Loopback0\nR1(config-if)# ip address 1.1.1.1 255.255.255.255\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# ip address 10.0.12.1 255.255.255.252\nR1(config-if)# no shutdown\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip address 10.0.13.1 255.255.255.252\nR1(config-if)# no shutdown\nR1(config)# interface GigabitEthernet0/2\nR1(config-if)# ip address 192.168.1.1 255.255.255.0\nR1(config-if)# no shutdown", commentaire: "Configuration IP complète de R1 (loopback + 3 interfaces)" },
          { os: "linux", cmd: "! ── R2 ──\nR2(config)# interface Loopback0\nR2(config-if)# ip address 2.2.2.2 255.255.255.255\nR2(config)# interface GigabitEthernet0/0\nR2(config-if)# ip address 10.0.12.2 255.255.255.252\nR2(config-if)# no shutdown\nR2(config)# interface GigabitEthernet0/1\nR2(config-if)# ip address 10.0.23.1 255.255.255.252\nR2(config-if)# no shutdown\nR2(config)# interface GigabitEthernet0/2\nR2(config-if)# ip address 192.168.2.1 255.255.255.0\nR2(config-if)# no shutdown", commentaire: "Configuration IP de R2" },
          { os: "linux", cmd: "! ── R3 ──\nR3(config)# interface Loopback0\nR3(config-if)# ip address 3.3.3.3 255.255.255.255\nR3(config)# interface GigabitEthernet0/0\nR3(config-if)# ip address 10.0.13.2 255.255.255.252\nR3(config-if)# no shutdown\nR3(config)# interface GigabitEthernet0/1\nR3(config-if)# ip address 10.0.23.2 255.255.255.252\nR3(config-if)# no shutdown\nR3(config)# interface GigabitEthernet0/2\nR3(config-if)# ip address 192.168.3.1 255.255.255.0\nR3(config-if)# no shutdown", commentaire: "Configuration IP de R3" }
        ],
        erreurs_courantes: [
          {
            symptome: "Ping entre routeurs voisins échoue même après configuration des IPs",
            cause: "Une ou plusieurs interfaces sont en 'administratively down' (shutdown par défaut sur IOSv)",
            solution: "Vérifier 'show ip interface brief' — toutes les interfaces doivent être 'up/up'. Faire no shutdown sur chacune si nécessaire."
          }
        ]
      },
      {
        titre: "Étape 2 — Activer OSPF sur les trois routeurs",
        contexte: "On active OSPF avec le process-id 1 (local au routeur, pas partagé) et on définit un router-id explicite via la loopback. La commande network annonce les réseaux à inclure dans OSPF — le wildcard mask est l'inverse du masque subnet (/30 → wildcard 0.0.0.3).",
        commandes: [
          { os: "linux", cmd: "R1(config)# router ospf 1\nR1(config-router)# router-id 1.1.1.1\nR1(config-router)# network 10.0.12.0 0.0.0.3 area 0\nR1(config-router)# network 10.0.13.0 0.0.0.3 area 0\nR1(config-router)# network 192.168.1.0 0.0.0.255 area 0\nR1(config-router)# passive-interface GigabitEthernet0/2", commentaire: "OSPF sur R1 — passive-interface sur le LAN (pas de voisin OSPF côté PCs)" },
          { os: "linux", cmd: "R2(config)# router ospf 1\nR2(config-router)# router-id 2.2.2.2\nR2(config-router)# network 10.0.12.0 0.0.0.3 area 0\nR2(config-router)# network 10.0.23.0 0.0.0.3 area 0\nR2(config-router)# network 192.168.2.0 0.0.0.255 area 0\nR2(config-router)# passive-interface GigabitEthernet0/2", commentaire: "OSPF sur R2" },
          { os: "linux", cmd: "R3(config)# router ospf 1\nR3(config-router)# router-id 3.3.3.3\nR3(config-router)# network 10.0.13.0 0.0.0.3 area 0\nR3(config-router)# network 10.0.23.0 0.0.0.3 area 0\nR3(config-router)# network 192.168.3.0 0.0.0.255 area 0\nR3(config-router)# passive-interface GigabitEthernet0/2", commentaire: "OSPF sur R3" },
          { os: "linux", cmd: "R1# show ip ospf neighbor", commentaire: "Vérifier les voisins OSPF — état doit être FULL pour chaque voisin" }
        ],
        erreurs_courantes: [
          {
            symptome: "Aucun voisin OSPF n'apparaît dans 'show ip ospf neighbor'",
            cause: "Mismatch de paramètres OSPF : hello/dead timer différents, area différente, ou MTU mismatch",
            solution: "Vérifier que les deux côtés d'un lien sont dans la même area (area 0). Vérifier les timers : show ip ospf interface. Sur GNS3, le MTU peut causer des problèmes : ajouter 'ip ospf mtu-ignore' sur les interfaces concernées."
          },
          {
            symptome: "Voisin en état EXSTART/EXCHANGE bloqué",
            cause: "MTU mismatch entre les interfaces des deux routeurs",
            solution: "Sur les interfaces GNS3 : R1(config-if)# ip ospf mtu-ignore (des deux côtés du lien)"
          }
        ]
      },
      {
        titre: "Étape 3 — Analyser la table OSPF et le routage",
        contexte: "Une fois les adjacences établies, OSPF échange des LSA (Link State Advertisements) et chaque routeur calcule les meilleurs chemins avec l'algorithme SPF (Dijkstra). On analyse la table OSPF et la table de routage.",
        commandes: [
          { os: "linux", cmd: "R1# show ip ospf neighbor detail", commentaire: "Détails complets des voisins : router-id, état, dead timer, interface" },
          { os: "linux", cmd: "R1# show ip ospf database", commentaire: "Base de données LSDB — voir les LSA Type 1 (router) et Type 2 (network)" },
          { os: "linux", cmd: "R1# show ip route ospf", commentaire: "Routes apprises via OSPF (marquées 'O') — doit voir 192.168.2.0 et 192.168.3.0" },
          { os: "linux", cmd: "R1# show ip ospf interface GigabitEthernet0/0", commentaire: "Détails OSPF sur l'interface : coût, hello/dead timers, DR/BDR" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Tester la reconvergence (simulation de panne)",
        contexte: "L'intérêt d'OSPF face au routage statique : si un lien tombe, OSPF recalcule automatiquement un chemin alternatif. On simule une panne en coupant le lien R1-R2 et on observe la reconvergence vers le chemin R1-R3-R2.",
        commandes: [
          { os: "linux", cmd: "# Depuis PC sur LAN R1 :\nPC1> ping 192.168.2.10 repeat 100", commentaire: "Lancer un ping continu vers le LAN R2 avant la panne" },
          { os: "linux", cmd: "# Simuler la panne du lien R1-R2 sur R1 :\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# shutdown", commentaire: "Couper le lien R1 ↔ R2 — observer les pertes de ping" },
          { os: "linux", cmd: "R1# show ip route ospf", commentaire: "Observer le nouveau chemin : 192.168.2.0 doit passer maintenant par R3 (10.0.13.x)" },
          { os: "linux", cmd: "# Rétablir le lien :\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# no shutdown", commentaire: "Rétablir — OSPF reconverge vers le chemin optimal" },
          { os: "linux", cmd: "R1# show ip ospf\nR1# show ip ospf statistics", commentaire: "Voir le nombre de calculs SPF effectués — augmente à chaque reconvergence" }
        ],
        erreurs_courantes: [
          {
            symptome: "Après la panne, aucun chemin alternatif n'est trouvé",
            cause: "Le réseau n'a pas de chemin redondant — vérifier la topologie",
            solution: "Dans cette topologie triangulaire, le chemin R1→R3→R2 doit exister. Vérifier que le lien R1-R3 (Gi0/1) et R3-R2 (lien 10.0.23.0/30) sont bien up et dans OSPF."
          }
        ]
      }
    ],
    checklist: [
      "show ip ospf neighbor sur R1, R2, R3 : tous les voisins en état FULL",
      "show ip route ospf sur R1 : routes vers 192.168.2.0/24 et 192.168.3.0/24 présentes (O)",
      "Ping R1 LAN → R2 LAN (192.168.1.x → 192.168.2.x) : OK",
      "Ping R1 LAN → R3 LAN (192.168.1.x → 192.168.3.x) : OK",
      "Simulation panne lien R1-R2 : reconvergence observée, ping reprend via R3",
      "show ip ospf database : LSA Type 1 présents pour les 3 router-IDs"
    ],
    tags: ["ospf", "routage-dynamique", "area0", "lsa", "dr-bdr", "convergence", "cisco", "gns3"],
    date_ajout: "2026-02-05",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 6 — Réseau : NAT/PAT sur routeur Cisco
  ────────────────────────────────────────────────────── */
  {
    id: 6,
    titre: "NAT statique, dynamique et PAT sur Cisco IOS",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 75,
    description: "Configurer les trois formes de NAT sur un routeur Cisco : NAT statique (1-pour-1 pour un serveur), NAT dynamique avec pool d'adresses publiques, et PAT (NAT overload) qui permet à tout un réseau privé de partager une seule adresse IP publique — la configuration la plus courante en entreprise.",
    objectifs: [
      "Distinguer et configurer NAT statique, dynamique et PAT (overload)",
      "Définir correctement les interfaces inside et outside",
      "Créer des ACL pour cibler le trafic à translater",
      "Vérifier les traductions actives avec show ip nat translations",
      "Comprendre pourquoi le PAT est la forme la plus utilisée"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "1x Cisco IOSv (routeur NAT)" },
      { type: "reseau",   nom: "Comprendre les adresses privées RFC 1918 (10.x, 172.16.x, 192.168.x)" },
      { type: "reseau",   nom: "Bases du routage statique maîtrisées" }
    ],
    schema_reseau: `<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- Zone inside -->
  <rect x="10" y="20" width="220" height="200" rx="10" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="110" y="38" text-anchor="middle" fill="#3B82F6" font-size="9">INSIDE (privé)</text>
  <!-- PCs -->
  <rect x="25" y="55" width="70" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="60" y="70" text-anchor="middle" fill="#A8A29E" font-size="9">PC1</text>
  <text x="60" y="82" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.10</text>
  <rect x="25" y="105" width="70" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="60" y="120" text-anchor="middle" fill="#A8A29E" font-size="9">PC2</text>
  <text x="60" y="132" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.20</text>
  <rect x="25" y="155" width="70" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="60" y="170" text-anchor="middle" fill="#A8A29E" font-size="9">Serveur</text>
  <text x="60" y="182" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.100</text>
  <!-- SW -->
  <rect x="140" y="105" width="60" height="35" rx="5" fill="#1C1917" stroke="#44403C" stroke-width="1"/>
  <text x="170" y="120" text-anchor="middle" fill="#A8A29E" font-size="9">SW</text>
  <line x1="95" y1="72" x2="140" y2="122" stroke="#3B82F6" stroke-width="1"/>
  <line x1="95" y1="122" x2="140" y2="122" stroke="#3B82F6" stroke-width="1"/>
  <line x1="95" y1="172" x2="140" y2="132" stroke="#10B981" stroke-width="1"/>
  <!-- Routeur NAT -->
  <ellipse cx="310" cy="120" rx="44" ry="30" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="310" y="116" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R-NAT</text>
  <text x="310" y="131" text-anchor="middle" fill="#78716C" font-size="7">NAT/PAT</text>
  <line x1="200" y1="122" x2="266" y2="120" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr4)"/>
  <text x="232" y="113" text-anchor="middle" fill="#78716C" font-size="7">Gi0/0 inside</text>
  <text x="232" y="123" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.1</text>
  <!-- Zone outside -->
  <rect x="390" y="20" width="220" height="200" rx="10" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.2)" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="500" y="38" text-anchor="middle" fill="#EF4444" font-size="9">OUTSIDE (public)</text>
  <!-- Internet/Cloud -->
  <ellipse cx="500" cy="120" rx="70" ry="50" fill="#1C1917" stroke="#EF4444" stroke-width="1.5"/>
  <text x="500" y="115" text-anchor="middle" fill="#EF4444" font-size="11">🌐</text>
  <text x="500" y="132" text-anchor="middle" fill="#A8A29E" font-size="9">Internet</text>
  <text x="500" y="145" text-anchor="middle" fill="#78716C" font-size="7">8.8.8.8...</text>
  <line x1="354" y1="120" x2="430" y2="120" stroke="#EF4444" stroke-width="2" marker-end="url(#arr4)"/>
  <text x="392" y="113" text-anchor="middle" fill="#78716C" font-size="7">Gi0/1 outside</text>
  <text x="392" y="123" text-anchor="middle" fill="#EF4444" font-size="7">203.0.113.1</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Configurer les interfaces et définir inside/outside",
        contexte: "La première étape NAT est de déclarer quelle interface est 'inside' (réseau privé) et laquelle est 'outside' (vers Internet/réseau public). Ce sont des mots-clés Cisco IOS qui orientent le moteur NAT.",
        commandes: [
          { os: "linux", cmd: "R-NAT(config)# interface GigabitEthernet0/0\nR-NAT(config-if)# ip address 192.168.1.1 255.255.255.0\nR-NAT(config-if)# ip nat inside\nR-NAT(config-if)# no shutdown", commentaire: "Interface inside — réseau privé 192.168.1.0/24" },
          { os: "linux", cmd: "R-NAT(config)# interface GigabitEthernet0/1\nR-NAT(config-if)# ip address 203.0.113.1 255.255.255.252\nR-NAT(config-if)# ip nat outside\nR-NAT(config-if)# no shutdown", commentaire: "Interface outside — IP publique 203.0.113.1" },
          { os: "linux", cmd: "R-NAT(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.2", commentaire: "Route par défaut vers le FAI/Internet" }
        ],
        erreurs_courantes: [
          {
            symptome: "NAT ne fonctionne pas — aucune traduction dans show ip nat translations",
            cause: "Les mots-clés 'ip nat inside' et 'ip nat outside' ne sont pas appliqués sur les bonnes interfaces",
            solution: "Vérifier avec 'show ip nat statistics' que inside et outside sont bien identifiés. Chaque interface doit avoir sa directive NAT."
          }
        ]
      },
      {
        titre: "Étape 2 — NAT statique (1-pour-1) pour le serveur",
        contexte: "Le NAT statique mappe une IP privée fixe vers une IP publique fixe. C'est utilisé pour les serveurs accessibles depuis Internet (web, mail...). Ici, le serveur 192.168.1.100 est accessible publiquement via 203.0.113.100.",
        commandes: [
          { os: "linux", cmd: "R-NAT(config)# ip nat inside source static 192.168.1.100 203.0.113.100", commentaire: "NAT statique : 192.168.1.100 ↔ 203.0.113.100 (bidirectionnel et permanent)" },
          { os: "linux", cmd: "R-NAT# show ip nat translations", commentaire: "Vérifier la traduction statique — apparaît même sans trafic actif" },
          { os: "linux", cmd: "R-NAT# show ip nat statistics", commentaire: "Statistiques NAT : hits, misses, interfaces inside/outside" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — PAT (NAT overload) pour les PCs",
        contexte: "Le PAT (Port Address Translation) permet à plusieurs hôtes privés de partager une seule IP publique. Le routeur distingue les sessions par les numéros de port TCP/UDP. C'est la configuration NAT la plus utilisée en entreprise et chez les particuliers (box FAI). On utilise une ACL pour cibler le trafic à translater.",
        commandes: [
          { os: "linux", cmd: "! Créer une ACL standard pour cibler le réseau privé\nR-NAT(config)# access-list 10 permit 192.168.1.0 0.0.0.255", commentaire: "ACL 10 : autorise tout le réseau 192.168.1.0/24 à être translaté" },
          { os: "linux", cmd: "R-NAT(config)# ip nat inside source list 10 interface GigabitEthernet0/1 overload", commentaire: "PAT : ACL 10 → IP de l'interface outside (overload = PAT)" },
          { os: "linux", cmd: "# Test : depuis PC1 (192.168.1.10), pinguer 8.8.8.8\n# Puis immédiatement :\nR-NAT# show ip nat translations", commentaire: "Observer les entrées PAT : source privée + port → IP publique + port différent" },
          { os: "linux", cmd: "R-NAT# clear ip nat translation *\nR-NAT# show ip nat translations", commentaire: "Vider la table NAT pour des tests propres" }
        ],
        erreurs_courantes: [
          {
            symptome: "Les PCs n'ont pas accès à Internet même avec PAT configuré",
            cause: "Pas de route par défaut sur le routeur, ou la route par défaut pointe vers le mauvais next-hop",
            solution: "Vérifier 'show ip route' — une route 0.0.0.0/0 doit exister. Vérifier aussi que les PCs ont bien le routeur NAT comme default gateway."
          },
          {
            symptome: "L'ACL dans la commande PAT ne match aucun trafic",
            cause: "Le numéro ou le nom de l'ACL dans la commande ip nat ne correspond pas à l'ACL créée",
            solution: "Vérifier avec 'show access-lists' que l'ACL 10 existe et correspond au bon réseau. Le wildcard 0.0.0.255 correspond au /24."
          }
        ]
      },
      {
        titre: "Étape 4 — NAT dynamique avec pool d'adresses",
        contexte: "Le NAT dynamique alloue une IP publique par session depuis un pool, sans multiplexage par port (contrairement au PAT). Moins courant, il est utile quand on dispose de plusieurs IPs publiques et qu'on veut éviter le partage de port. À titre pédagogique surtout.",
        commandes: [
          { os: "linux", cmd: "! Définir un pool d'IPs publiques\nR-NAT(config)# ip nat pool MON-POOL 203.0.113.50 203.0.113.60 netmask 255.255.255.240", commentaire: "Pool de 11 IPs publiques (203.0.113.50 à 203.0.113.60)" },
          { os: "linux", cmd: "! ACL pour cibler les hôtes\nR-NAT(config)# access-list 20 permit 192.168.1.0 0.0.0.255", commentaire: "ACL 20 — même réseau, ACL séparée pour ce NAT dynamique" },
          { os: "linux", cmd: "R-NAT(config)# ip nat inside source list 20 pool MON-POOL", commentaire: "NAT dynamique : réseau privé → pool d'IPs publiques (sans overload)" },
          { os: "linux", cmd: "R-NAT# show ip nat translations verbose", commentaire: "Affichage détaillé avec ages et flags des traductions" }
        ],
        erreurs_courantes: [
          {
            symptome: "Erreur 'pool exhausted' — le pool est épuisé",
            cause: "Plus d'hôtes que d'IPs dans le pool — chaque hôte consomme une IP entière",
            solution: "En production, utiliser le PAT (overload) à la place. Ou agrandir le pool. C'est la limitation principale du NAT dynamique sans overload."
          }
        ]
      }
    ],
    checklist: [
      "show ip nat statistics : interfaces inside et outside correctement identifiées",
      "NAT statique : show ip nat translations montre la traduction 192.168.1.100 ↔ 203.0.113.100",
      "PAT : après un ping depuis PC1, show ip nat translations montre une entrée avec port source modifié",
      "Ping depuis PC1 vers 8.8.8.8 (simulé) : fonctionnel via PAT",
      "clear ip nat translation * suivi d'un test : nouvelle entrée créée correctement"
    ],
    tags: ["nat", "pat", "overload", "cisco", "gns3", "reseau", "acl", "ip-publique"],
    date_ajout: "2026-02-10",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 7 — Réseau : DHCP sur routeur Cisco + relay agent
  ────────────────────────────────────────────────────── */
  {
    id: 7,
    titre: "Serveur DHCP Cisco IOS + ip helper-address (relay)",
    categorie: "reseau",
    niveau: "débutant",
    duree: 60,
    description: "Configurer un routeur Cisco comme serveur DHCP pour distribuer automatiquement les paramètres réseau (IP, masque, gateway, DNS) aux hôtes d'un LAN. Puis étendre le service à un deuxième LAN distant via le mécanisme ip helper-address (DHCP relay agent).",
    objectifs: [
      "Créer des pools DHCP avec exclusions d'adresses sur IOS",
      "Configurer les options DHCP essentielles (gateway, DNS, lease time)",
      "Vérifier l'attribution des IPs avec show ip dhcp binding",
      "Comprendre et configurer le ip helper-address pour relayer les broadcasts DHCP",
      "Tester l'obtention dynamique d'IP depuis les clients"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "1-2x Cisco IOSv" },
      { type: "reseau",   nom: "Comprendre le fonctionnement DORA (Discover/Offer/Request/Ack)" }
    ],
    schema_reseau: `<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- R1 (DHCP server) -->
  <ellipse cx="300" cy="120" rx="50" ry="32" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="300" y="115" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R1</text>
  <text x="300" y="130" text-anchor="middle" fill="#A8A29E" font-size="8">DHCP Server</text>
  <!-- LAN 1 direct -->
  <rect x="30" y="40" width="190" height="160" rx="8" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="125" y="56" text-anchor="middle" fill="#3B82F6" font-size="8">LAN 1 — 10.0.1.0/24</text>
  <rect x="50" y="70" width="60" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="80" y="85" text-anchor="middle" fill="#A8A29E" font-size="9">PC1</text>
  <text x="80" y="97" text-anchor="middle" fill="#3B82F6" font-size="7">DHCP client</text>
  <rect x="50" y="120" width="60" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="80" y="135" text-anchor="middle" fill="#A8A29E" font-size="9">PC2</text>
  <text x="80" y="147" text-anchor="middle" fill="#3B82F6" font-size="7">DHCP client</text>
  <rect x="50" y="170" width="90" height="20" rx="4" fill="#1C1917" stroke="#44403C" stroke-width="1"/>
  <text x="95" y="183" text-anchor="middle" fill="#78716C" font-size="7">SW-LAN1</text>
  <line x1="80" y1="105" x2="80" y2="170" stroke="#3B82F6" stroke-width="1"/>
  <line x1="80" y1="155" x2="80" y2="170" stroke="#3B82F6" stroke-width="1"/>
  <line x1="140" y1="180" x2="250" y2="135" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr5)"/>
  <text x="185" y="145" text-anchor="middle" fill="#78716C" font-size="7">Gi0/0 — 10.0.1.1</text>
  <!-- LAN 2 via relay -->
  <rect x="400" y="40" width="205" height="160" rx="8" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="502" y="56" text-anchor="middle" fill="#10B981" font-size="8">LAN 2 — 10.0.2.0/24</text>
  <rect x="430" y="70" width="60" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="460" y="85" text-anchor="middle" fill="#A8A29E" font-size="9">PC3</text>
  <text x="460" y="97" text-anchor="middle" fill="#10B981" font-size="7">DHCP client</text>
  <rect x="430" y="120" width="90" height="20" rx="4" fill="#1C1917" stroke="#44403C" stroke-width="1"/>
  <text x="475" y="133" text-anchor="middle" fill="#78716C" font-size="7">SW-LAN2 (relay)</text>
  <line x1="460" y1="105" x2="460" y2="120" stroke="#10B981" stroke-width="1"/>
  <line x1="400" y1="130" x2="350" y2="130" stroke="#10B981" stroke-width="2" marker-end="url(#arr5)"/>
  <text x="375" y="122" text-anchor="middle" fill="#78716C" font-size="7">Gi0/1 — 10.0.2.1</text>
  <!-- relay label -->
  <text x="460" y="170" text-anchor="middle" fill="#10B981" font-size="7">ip helper-address</text>
  <text x="460" y="182" text-anchor="middle" fill="#10B981" font-size="7">10.0.1.1</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Configurer les interfaces du routeur",
        contexte: "Le routeur R1 a deux interfaces LAN : Gi0/0 vers LAN1 (son réseau direct) et Gi0/1 vers LAN2 (où il faudra le relay). On commence par assigner les IPs et activer les interfaces.",
        commandes: [
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/0\nR1(config-if)# ip address 10.0.1.1 255.255.255.0\nR1(config-if)# no shutdown\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip address 10.0.2.1 255.255.255.0\nR1(config-if)# no shutdown", commentaire: "Gateway LAN1 = 10.0.1.1 / Gateway LAN2 = 10.0.2.1" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Créer les pools DHCP pour chaque LAN",
        contexte: "On configure deux pools DHCP : un pour LAN1, un pour LAN2. On exclut d'abord les IPs réservées (gateways, serveurs, imprimantes) avant de créer les pools — sinon le routeur pourrait les attribuer à des clients.",
        commandes: [
          { os: "linux", cmd: "! Exclure les IPs réservées avant de créer les pools\nR1(config)# ip dhcp excluded-address 10.0.1.1 10.0.1.10\nR1(config)# ip dhcp excluded-address 10.0.2.1 10.0.2.10", commentaire: "Exclure .1 à .10 de chaque réseau (gateway + serveurs statiques)" },
          { os: "linux", cmd: "R1(config)# ip dhcp pool LAN1\nR1(dhcp-config)# network 10.0.1.0 255.255.255.0\nR1(dhcp-config)# default-router 10.0.1.1\nR1(dhcp-config)# dns-server 8.8.8.8 8.8.4.4\nR1(dhcp-config)# domain-name lan1.local\nR1(dhcp-config)# lease 1", commentaire: "Pool LAN1 : réseau, gateway, DNS, domaine, bail de 1 jour" },
          { os: "linux", cmd: "R1(config)# ip dhcp pool LAN2\nR1(dhcp-config)# network 10.0.2.0 255.255.255.0\nR1(dhcp-config)# default-router 10.0.2.1\nR1(dhcp-config)# dns-server 8.8.8.8 8.8.4.4\nR1(dhcp-config)# domain-name lan2.local\nR1(dhcp-config)# lease 1", commentaire: "Pool LAN2 — même structure, réseau différent" },
          { os: "linux", cmd: "R1# show ip dhcp pool", commentaire: "Vérifier les pools créés et leurs paramètres" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le client obtient une IP dans la plage exclue",
            cause: "La commande ip dhcp excluded-address a été tapée APRÈS la création du pool",
            solution: "L'ordre n'a pas d'importance en réalité — les exclusions s'appliquent toujours. Vérifier avec 'show ip dhcp pool' que les excluded-address sont correctement listées."
          }
        ]
      },
      {
        titre: "Étape 3 — Tester l'attribution DHCP sur LAN1",
        contexte: "Les clients du LAN1 sont directement connectés à Gi0/0 — le routeur répond directement aux broadcasts DHCP. On configure les VPCS en mode DHCP et on observe l'attribution.",
        commandes: [
          { os: "linux", cmd: "# Sur PC1 (VPCS GNS3) :\nPC1> dhcp\nPC1> show ip", commentaire: "Obtenir une IP via DHCP — afficher les paramètres reçus" },
          { os: "linux", cmd: "R1# show ip dhcp binding", commentaire: "Voir les baux actifs : IP attribuée, adresse MAC, expiration" },
          { os: "linux", cmd: "R1# show ip dhcp statistics", commentaire: "Compteurs DHCP : Discover/Offer/Request/Ack reçus et envoyés" },
          { os: "linux", cmd: "R1# debug ip dhcp server events\n# Refaire un dhcp sur le client\nR1# undebug all", commentaire: "Observer le processus DORA en temps réel dans les logs" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le client n'obtient pas d'adresse — timeout DHCP",
            cause: "Connectivité L2 absente entre le client et le routeur, ou service DHCP non actif",
            solution: "Vérifier le câblage dans GNS3 et que les interfaces sont up. Vérifier 'show ip dhcp server statistics' — si les Discovers n'arrivent pas, problème L2. Service DHCP actif par défaut sur IOS si un pool existe."
          }
        ]
      },
      {
        titre: "Étape 4 — Configurer le ip helper-address pour LAN2",
        contexte: "Les clients du LAN2 envoient des broadcasts DHCP — mais les routeurs ne propagent pas les broadcasts entre sous-réseaux. Le ip helper-address configure le routeur pour intercepter ces broadcasts et les retransmettre en unicast vers le serveur DHCP (ici R1 lui-même sur 10.0.1.1). C'est le relay agent DHCP (RFC 3046).",
        commandes: [
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip helper-address 10.0.1.1", commentaire: "Relay DHCP : broadcasts LAN2 → unicast vers 10.0.1.1 (R1 lui-même)" },
          { os: "linux", cmd: "# Sur PC3 (LAN2) :\nPC3> dhcp\nPC3> show ip", commentaire: "PC3 doit obtenir une IP dans 10.0.2.0/24 via le relay" },
          { os: "linux", cmd: "R1# show ip dhcp binding", commentaire: "Vérifier qu'un bail 10.0.2.x apparaît maintenant dans la table" },
          { os: "linux", cmd: "R1# show ip helper-address", commentaire: "Vérifier la configuration du relay sur les interfaces" }
        ],
        erreurs_courantes: [
          {
            symptome: "PC3 n'obtient toujours pas d'IP après configuration du relay",
            cause: "Le ip helper-address est configuré sur la mauvaise interface, ou l'IP du serveur DHCP est incorrecte",
            solution: "Le ip helper-address doit être sur l'interface côté LAN2 (Gi0/1), pas côté LAN1. L'IP 10.0.1.1 doit être joignable depuis R1. Vérifier avec 'show ip interface Gi0/1'."
          }
        ]
      }
    ],
    checklist: [
      "show ip dhcp pool : deux pools LAN1 et LAN2 configurés avec les bons paramètres",
      "PC1 (LAN1) obtient une IP dans 10.0.1.11-254 avec gateway 10.0.1.1 et DNS 8.8.8.8",
      "show ip dhcp binding : baux actifs visibles pour LAN1",
      "ip helper-address configuré sur Gi0/1 (interface LAN2)",
      "PC3 (LAN2) obtient une IP dans 10.0.2.11-254 via le relay",
      "show ip dhcp statistics : compteurs Discover/Offer/Request/Ack cohérents"
    ],
    tags: ["dhcp", "helper-address", "relay", "cisco", "gns3", "pool", "dora", "reseau"],
    date_ajout: "2026-02-15",
    source: "École"
  }

];

/* ─── Export pour utilisation dans les autres fichiers ─── */
// Utilisé via window.LABS et window.CATEGORIES (pas de module ES6 pour PWA offline simple)
window.CATEGORIES = CATEGORIES;
window.LABS = LABS;
