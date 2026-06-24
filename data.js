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
  },

  /* ──────────────────────────────────────────────────────
     TP 8 — Réseau : STP — observation et manipulation
  ────────────────────────────────────────────────────── */
  {
    id: 8,
    titre: "Spanning Tree Protocol — observation et manipulation des priorités",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 75,
    description: "Observer le fonctionnement du STP (802.1D) sur une topologie redondante avec 3 switches Cisco. Identifier le Root Bridge élu automatiquement, comprendre les états des ports (Blocking/Forwarding), puis manipuler les priorités pour forcer l'élection d'un Root Bridge précis et observer la reconvergence après une panne.",
    objectifs: [
      "Comprendre pourquoi STP est nécessaire (boucles L2 et broadcast storms)",
      "Identifier le Root Bridge élu et les ports Root/Designated/Blocked",
      "Manipuler la priorité STP pour forcer l'élection d'un Root Bridge spécifique",
      "Observer la reconvergence STP après coupure d'un lien",
      "Activer PortFast et BPDU Guard sur les ports d'accès"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "3x Cisco IOSv-L2 (switches)" },
      { type: "reseau",   nom: "Notions de base sur les switches et les VLANs" }
    ],
    schema_reseau: `<svg viewBox="0 0 580 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <rect x="220" y="30" width="140" height="55" rx="8" fill="#1C1917" stroke="#F59E0B" stroke-width="2.5"/>
  <text x="290" y="52" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">SW1 — ROOT BRIDGE</text>
  <text x="290" y="67" text-anchor="middle" fill="#78716C" font-size="8">Priorité 4096</text>
  <rect x="60" y="180" width="140" height="55" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="130" y="205" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="bold">SW2</text>
  <text x="130" y="220" text-anchor="middle" fill="#78716C" font-size="8">Priorité 32768</text>
  <rect x="380" y="180" width="140" height="55" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="450" y="205" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="bold">SW3</text>
  <text x="450" y="220" text-anchor="middle" fill="#78716C" font-size="8">Priorité 32768</text>
  <line x1="220" y1="70" x2="160" y2="180" stroke="#10B981" stroke-width="2.5"/>
  <line x1="360" y1="70" x2="400" y2="180" stroke="#10B981" stroke-width="2.5"/>
  <line x1="200" y1="207" x2="380" y2="207" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="8,4"/>
  <text x="290" y="200" text-anchor="middle" fill="#EF4444" font-size="8">BLOQUÉ — Alternate Port</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Construire la topologie et observer STP par défaut",
        contexte: "On relie les 3 switches en triangle. Sans STP, cette boucle provoquerait une broadcast storm immédiate. STP est actif par défaut sur IOS — on observe d'abord qui devient Root Bridge sans configuration manuelle.",
        commandes: [
          { os: "linux", cmd: "SW1# show spanning-tree\nSW1# show spanning-tree summary", commentaire: "Observer le Root Bridge élu — celui avec la plus petite MAC si priorités égales" },
          { os: "linux", cmd: "SW1# show spanning-tree vlan 1 detail", commentaire: "Détail STP : Bridge ID, Root ID, coûts, rôles des ports" },
          { os: "linux", cmd: "SW1# show spanning-tree vlan 1 brief", commentaire: "Vue synthétique : rôle (Root/Desg/Altn) et état (FWD/BLK) de chaque port" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le réseau est inaccessible dès la connexion du troisième lien",
            cause: "STP n'est pas encore convergé — il faut attendre 30-50 secondes (Listening 15s + Learning 15s)",
            solution: "Patienter la convergence initiale. C'est normal avec 802.1D classique. Pour accélérer sur les ports d'accès, utiliser PortFast."
          }
        ]
      },
      {
        titre: "Étape 2 — Forcer l'élection du Root Bridge sur SW1",
        contexte: "Par défaut, le Root Bridge est le switch avec la priorité la plus basse (32768), départagée par la MAC la plus petite. On force SW1 à être Root Bridge en abaissant sa priorité. La priorité doit être un multiple de 4096.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# spanning-tree vlan 1 priority 4096", commentaire: "4096 < 32768 → SW1 devient Root Bridge pour VLAN 1" },
          { os: "linux", cmd: "SW1(config)# spanning-tree vlan 1 root primary", commentaire: "Méthode automatique — IOS calcule la priorité optimale" },
          { os: "linux", cmd: "SW2(config)# spanning-tree vlan 1 root secondary", commentaire: "SW2 prend priorité 28672 — devient Root si SW1 tombe" },
          { os: "linux", cmd: "SW1# show spanning-tree vlan 1 | include Root", commentaire: "Vérifier que SW1 affiche 'This bridge is the root'" }
        ],
        erreurs_courantes: [
          {
            symptome: "Erreur : 'spanning-tree vlan 1 priority 3000' refusée",
            cause: "La priorité doit être un multiple exact de 4096",
            solution: "Valeurs valides : 0, 4096, 8192, 12288, 16384, 20480, 24576, 28672, 32768... La commande 'root primary' est plus simple."
          }
        ]
      },
      {
        titre: "Étape 3 — Identifier les rôles et états des ports",
        contexte: "Une fois SW1 élu Root Bridge, on analyse les rôles STP sur chaque switch : Root Port (meilleur port vers le Root), Designated Port (forward sur chaque segment), Alternate Port (bloqué pour casser la boucle).",
        commandes: [
          { os: "linux", cmd: "SW2# show spanning-tree vlan 1", commentaire: "Identifier le Root Port (vers SW1) et le port Alternate (vers SW3 si bloqué)" },
          { os: "linux", cmd: "SW3# show spanning-tree vlan 1", commentaire: "Le port avec le coût le plus élevé vers le Root sera bloqué" },
          { os: "linux", cmd: "SW1# show spanning-tree vlan 1 interface GigabitEthernet0/1 detail", commentaire: "Détail d'un port : coût, rôle, état, BPDU envoyés/reçus" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — PortFast et BPDU Guard sur les ports d'accès",
        contexte: "PortFast fait passer un port directement en Forwarding sans attendre les 30-50s de convergence. C'est uniquement pour les ports connectés à des PCs — jamais entre switches. BPDU Guard désactive le port si un BPDU est reçu.",
        commandes: [
          { os: "linux", cmd: "SW2(config)# interface GigabitEthernet0/3\nSW2(config-if)# spanning-tree portfast\nSW2(config-if)# spanning-tree bpduguard enable", commentaire: "PortFast + BPDU Guard sur le port PC" },
          { os: "linux", cmd: "SW2(config)# spanning-tree portfast default", commentaire: "Activer PortFast globalement sur tous les ports access" },
          { os: "linux", cmd: "SW2# show spanning-tree interface GigabitEthernet0/3 portfast", commentaire: "Vérifier que PortFast est activé" },
          { os: "linux", cmd: "SW2# show spanning-tree inconsistentports", commentaire: "Voir les ports désactivés par BPDU Guard (err-disabled)" }
        ],
        erreurs_courantes: [
          {
            symptome: "Port passe en err-disabled après activation BPDU Guard",
            cause: "Un switch a été détecté sur ce port — BPDU Guard a fonctionné correctement",
            solution: "Retirer le switch non autorisé, puis : shutdown / no shutdown sur l'interface. Configurer 'errdisable recovery cause bpduguard' pour la réactivation automatique."
          }
        ]
      },
      {
        titre: "Étape 5 — Simuler une panne et observer la reconvergence",
        contexte: "On coupe le lien SW1-SW2 pour forcer une reconvergence STP. Le port bloqué entre SW2 et SW3 doit s'ouvrir pour maintenir la connectivité. Avec 802.1D classique : ~30-50s. Avec RSTP (802.1w) : ~1s.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# shutdown", commentaire: "Simuler la panne du lien SW1-SW2" },
          { os: "linux", cmd: "SW2# show spanning-tree vlan 1", commentaire: "SW2 doit maintenant avoir son Root Port vers SW3" },
          { os: "linux", cmd: "SW1(config-if)# no shutdown", commentaire: "Rétablir — reconvergence vers la topologie optimale" },
          { os: "linux", cmd: "SW1(config)# spanning-tree mode rapid-pvst\nSW2(config)# spanning-tree mode rapid-pvst\nSW3(config)# spanning-tree mode rapid-pvst", commentaire: "Optionnel : activer RSTP pour convergence quasi-instantanée" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "show spanning-tree vlan 1 sur SW1 : 'This bridge is the root' confirmé",
      "Root Port correctement identifié vers SW1 sur SW2 et SW3",
      "Un port en état BLK (Alternate) visible pour casser la boucle",
      "PortFast + BPDU Guard configurés sur les ports d'accès",
      "Simulation panne SW1-SW2 : reconvergence observée, port bloqué passe en Forwarding",
      "show spanning-tree summary : nombre de ports FWD/BLK cohérent"
    ],
    tags: ["stp", "spanning-tree", "root-bridge", "portfast", "bpduguard", "rstp", "cisco", "switching"],
    date_ajout: "2026-02-20",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 9 — Réseau : EtherChannel LACP
  ────────────────────────────────────────────────────── */
  {
    id: 9,
    titre: "EtherChannel LACP (802.3ad) entre deux switches Cisco",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 60,
    description: "Agréger deux liens physiques entre deux switches Cisco en un seul lien logique EtherChannel via le protocole LACP (802.3ad). L'agrégation double la bande passante et apporte de la redondance : si un lien physique tombe, le trafic continue sur l'autre sans interruption.",
    objectifs: [
      "Comprendre la différence entre LACP (802.3ad), PAgP (Cisco) et EtherChannel statique",
      "Configurer un Port-Channel avec LACP en mode active/passive",
      "Vérifier l'état de l'agrégation avec show etherchannel summary",
      "Configurer le Port-Channel en mode trunk pour transporter les VLANs",
      "Tester la redondance en coupant un lien physique"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "2x Cisco IOSv-L2" },
      { type: "reseau",   nom: "VLANs et trunks 802.1Q maîtrisés" }
    ],
    schema_reseau: `<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <rect x="60" y="75" width="160" height="70" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="140" y="103" text-anchor="middle" fill="#3B82F6" font-size="12" font-weight="bold">SW1</text>
  <text x="140" y="118" text-anchor="middle" fill="#78716C" font-size="8">LACP active</text>
  <rect x="360" y="75" width="160" height="70" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="440" y="103" text-anchor="middle" fill="#3B82F6" font-size="12" font-weight="bold">SW2</text>
  <text x="440" y="118" text-anchor="middle" fill="#78716C" font-size="8">LACP passive</text>
  <line x1="220" y1="100" x2="360" y2="100" stroke="#F59E0B" stroke-width="3"/>
  <text x="290" y="93" text-anchor="middle" fill="#F59E0B" font-size="8">Gi0/1 — Gi0/1</text>
  <line x1="220" y1="125" x2="360" y2="125" stroke="#F59E0B" stroke-width="3"/>
  <text x="290" y="142" text-anchor="middle" fill="#F59E0B" font-size="8">Gi0/2 — Gi0/2</text>
  <rect x="215" y="50" width="150" height="22" rx="4" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" stroke-width="1"/>
  <text x="290" y="65" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="bold">Port-Channel 1 — 2Gbps</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Vérifier la compatibilité et préparer les interfaces",
        contexte: "Les interfaces à agréger doivent avoir exactement les mêmes paramètres : même vitesse, même duplex, même mode. On les remet à zéro avant la configuration pour éviter tout conflit.",
        commandes: [
          { os: "linux", cmd: "SW1# show interfaces GigabitEthernet0/1 status\nSW1# show interfaces GigabitEthernet0/2 status", commentaire: "Vérifier vitesse et duplex — doivent être identiques sur les deux ports" },
          { os: "linux", cmd: "SW1(config)# default interface GigabitEthernet0/1\nSW1(config)# default interface GigabitEthernet0/2", commentaire: "Remettre les interfaces à zéro avant de configurer EtherChannel" }
        ],
        erreurs_courantes: [
          {
            symptome: "EtherChannel en état 'suspended' ou 'err-disabled'",
            cause: "Les interfaces ont des configurations différentes (vitesse, VLAN natif, mode trunk/access)",
            solution: "Utiliser 'default interface GiX/X' des deux côtés pour repartir de zéro, puis reconfigurer uniformément."
          }
        ]
      },
      {
        titre: "Étape 2 — Configurer EtherChannel LACP sur SW1 et SW2",
        contexte: "On crée le Port-Channel en assignant les interfaces physiques au groupe 1. LACP nécessite qu'au moins un côté soit en mode 'active'. L'autre peut être 'active' ou 'passive'. Les deux en 'passive' ne fonctionnent pas.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface range GigabitEthernet0/1 - 2\nSW1(config-if-range)# channel-group 1 mode active\nSW1(config-if-range)# no shutdown", commentaire: "SW1 en mode LACP active — initie la négociation" },
          { os: "linux", cmd: "SW2(config)# interface range GigabitEthernet0/1 - 2\nSW2(config-if-range)# channel-group 1 mode active\nSW2(config-if-range)# no shutdown", commentaire: "SW2 en active aussi (active/active fonctionne)" },
          { os: "linux", cmd: "SW1# show etherchannel summary", commentaire: "Port-Channel1 doit être en état 'SU' avec les ports en 'P' (bundled)" }
        ],
        erreurs_courantes: [
          {
            symptome: "show etherchannel summary affiche 'SD' (standalone, down)",
            cause: "LACP ne négocie pas — mismatch de mode ou interfaces non connectées",
            solution: "Vérifier les câbles GNS3 et que les deux côtés ont 'channel-group 1 mode active'."
          }
        ]
      },
      {
        titre: "Étape 3 — Configurer le Port-Channel en mode trunk",
        contexte: "Le trunk et les VLANs se configurent sur l'interface logique Port-Channel, pas sur les interfaces physiques. La configuration se propage automatiquement aux membres du groupe.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface Port-Channel1\nSW1(config-if)# switchport trunk encapsulation dot1q\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan all", commentaire: "Trunk sur le Port-Channel — transporte tous les VLANs" },
          { os: "linux", cmd: "SW2(config)# interface Port-Channel1\nSW2(config-if)# switchport trunk encapsulation dot1q\nSW2(config-if)# switchport mode trunk\nSW2(config-if)# switchport trunk allowed vlan all", commentaire: "Même config trunk sur SW2" },
          { os: "linux", cmd: "SW1# show interfaces Port-Channel1 trunk", commentaire: "Vérifier trunk actif sur le Port-Channel" },
          { os: "linux", cmd: "SW1# show etherchannel 1 detail", commentaire: "Détail complet : protocole LACP, ports membres, hash policy" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Tester la redondance",
        contexte: "On coupe un lien physique et on vérifie que le Port-Channel reste UP. LACP rebascule le trafic sur le lien restant sans interruption.",
        commandes: [
          { os: "linux", cmd: "SW1# show etherchannel load-balance", commentaire: "Voir la politique de répartition du trafic" },
          { os: "linux", cmd: "SW1(config)# port-channel load-balance src-dst-mac", commentaire: "Répartition basée sur src+dst MAC" },
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# shutdown", commentaire: "Couper Gi0/1 — le trafic bascule sur Gi0/2 instantanément" },
          { os: "linux", cmd: "SW1# show etherchannel summary", commentaire: "Gi0/1 en 'D' (down), Gi0/2 reste 'P' — Port-Channel toujours UP" },
          { os: "linux", cmd: "SW1(config-if)# no shutdown", commentaire: "Gi0/1 rejoint automatiquement le bundle" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "show etherchannel summary : Port-Channel1 en état 'SU', Gi0/1 et Gi0/2 en 'P'",
      "show interfaces Port-Channel1 trunk : trunk actif avec VLANs autorisés",
      "Ping entre PCs des deux côtés via le Port-Channel : fonctionnel",
      "Simulation panne Gi0/1 : Port-Channel reste UP, trafic continue sur Gi0/2",
      "show etherchannel load-balance : politique configurée"
    ],
    tags: ["etherchannel", "lacp", "port-channel", "agregation", "redondance", "trunk", "cisco", "switching"],
    date_ajout: "2026-02-25",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 10 — Réseau : VTP Server / Client / Transparent
  ────────────────────────────────────────────────────── */
  {
    id: 10,
    titre: "VTP — modes Server, Client et Transparent sur Cisco",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 60,
    description: "Configurer le VLAN Trunking Protocol pour propager automatiquement les VLANs entre switches. On configure un switch en mode Server, des switches en Client (reçoivent et appliquent) et un switch en Transparent (laisse passer sans appliquer). On aborde aussi le risque critique du Revision Number.",
    objectifs: [
      "Comprendre les trois modes VTP : Server, Client, Transparent",
      "Configurer un domaine VTP avec mot de passe",
      "Observer la propagation automatique des VLANs",
      "Comprendre le risque du VTP Revision Number et comment le neutraliser",
      "Savoir quand utiliser VTP Transparent plutôt que Client"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "3x Cisco IOSv-L2" },
      { type: "reseau",   nom: "VLANs et trunks 802.1Q maîtrisés" }
    ],
    schema_reseau: `<svg viewBox="0 0 580 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <rect x="210" y="20" width="160" height="65" rx="8" fill="#1C1917" stroke="#F59E0B" stroke-width="2.5"/>
  <text x="290" y="45" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">SW1 — SERVER</text>
  <text x="290" y="62" text-anchor="middle" fill="#78716C" font-size="8">Crée/modifie/supprime VLANs</text>
  <rect x="50" y="145" width="160" height="60" rx="8" fill="#1C1917" stroke="#10B981" stroke-width="2"/>
  <text x="130" y="170" text-anchor="middle" fill="#10B981" font-size="11" font-weight="bold">SW2 — CLIENT</text>
  <text x="130" y="186" text-anchor="middle" fill="#78716C" font-size="8">Reçoit et applique les VLANs</text>
  <rect x="370" y="145" width="170" height="60" rx="8" fill="#1C1917" stroke="#8B5CF6" stroke-width="2"/>
  <text x="455" y="170" text-anchor="middle" fill="#8B5CF6" font-size="11" font-weight="bold">SW3 — TRANSPARENT</text>
  <text x="455" y="186" text-anchor="middle" fill="#78716C" font-size="8">Relaie sans appliquer</text>
  <line x1="210" y1="65" x2="155" y2="145" stroke="#F59E0B" stroke-width="2"/>
  <line x1="370" y1="65" x2="420" y2="145" stroke="#F59E0B" stroke-width="2"/>
  <text x="155" y="108" text-anchor="middle" fill="#F59E0B" font-size="8">VTP advert</text>
  <text x="430" y="108" text-anchor="middle" fill="#F59E0B" font-size="8">VTP advert</text>
  <rect x="170" y="4" width="240" height="16" rx="4" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.25)" stroke-width="1"/>
  <text x="290" y="15" text-anchor="middle" fill="#F59E0B" font-size="8">Domaine: MON-RESEAU · mdp: cisco123</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Configurer les trunks entre les switches",
        contexte: "VTP ne fonctionne que sur les liens trunk. Les advertisements VTP voyagent dans les trames 802.1Q. On commence par les trunks avant toute config VTP.",
        commandes: [
          { os: "linux", cmd: "! Sur SW1, SW2 et SW3 :\nSWx(config)# interface GigabitEthernet0/1\nSWx(config-if)# switchport trunk encapsulation dot1q\nSWx(config-if)# switchport mode trunk\nSWx(config-if)# no shutdown", commentaire: "Trunk obligatoire pour transporter les advertisements VTP" },
          { os: "linux", cmd: "SW1# show interfaces trunk", commentaire: "Vérifier les trunks actifs avant de configurer VTP" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Configurer le domaine VTP et les modes",
        contexte: "Tous les switches du domaine partagent le même nom et mot de passe VTP. Le Server est le seul à créer/modifier des VLANs. Les Clients appliquent automatiquement. Le Transparent ignore mais relaie.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# vtp domain MON-RESEAU\nSW1(config)# vtp mode server\nSW1(config)# vtp password cisco123\nSW1(config)# vtp version 2", commentaire: "SW1 = VTP Server" },
          { os: "linux", cmd: "SW2(config)# vtp domain MON-RESEAU\nSW2(config)# vtp mode client\nSW2(config)# vtp password cisco123", commentaire: "SW2 = VTP Client — ne peut pas créer de VLANs localement" },
          { os: "linux", cmd: "SW3(config)# vtp domain MON-RESEAU\nSW3(config)# vtp mode transparent\nSW3(config)# vtp password cisco123", commentaire: "SW3 = VTP Transparent — gère ses propres VLANs, relaie les advertisements" },
          { os: "linux", cmd: "SW1# show vtp status", commentaire: "Vérifier : domaine, mode, Configuration Revision number" }
        ],
        erreurs_courantes: [
          {
            symptome: "VLANs ne se propagent pas vers SW2",
            cause: "Mot de passe ou domaine VTP différent entre les switches",
            solution: "Vérifier avec 'show vtp password'. Le domaine et le mot de passe doivent être EXACTEMENT identiques (sensible à la casse)."
          }
        ]
      },
      {
        titre: "Étape 3 — Créer des VLANs sur le Server et observer la propagation",
        contexte: "On crée les VLANs uniquement sur SW1. Après quelques secondes, ils apparaissent automatiquement sur SW2 (Client). SW3 (Transparent) ne les applique pas mais les relaie.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# vlan 10\nSW1(config-vlan)# name ADMIN\nSW1(config)# vlan 20\nSW1(config-vlan)# name PROD\nSW1(config)# vlan 30\nSW1(config-vlan)# name DMZ", commentaire: "VLANs créés sur le Server uniquement" },
          { os: "linux", cmd: "SW2# show vlan brief", commentaire: "VLAN 10, 20, 30 doivent apparaître automatiquement sur SW2 !" },
          { os: "linux", cmd: "SW3# show vlan brief", commentaire: "SW3 (Transparent) ne doit PAS avoir les VLANs automatiquement" },
          { os: "linux", cmd: "SW1# show vtp status | include Revision", commentaire: "Le Revision Number augmente à chaque modification VLAN" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Le risque VTP Revision Number",
        contexte: "DANGER : si un switch avec un Revision Number plus élevé est connecté, il écrase la base de VLANs de tous les Clients — même s'il n'a aucun VLAN. Toujours réinitialiser le Revision à 0 avant de connecter un nouveau switch.",
        commandes: [
          { os: "linux", cmd: "SW2# show vtp status | include Revision", commentaire: "Retenir ce numéro — dangereux s'il est élevé sur un switch inconnu" },
          { os: "linux", cmd: "! Réinitialiser le Revision à 0 — méthode 1 :\nSW2(config)# vtp mode transparent\nSW2(config)# vtp mode client", commentaire: "Changer de mode remet le Revision à 0" },
          { os: "linux", cmd: "! Méthode 2 : changer de domaine puis revenir\nSW2(config)# vtp domain TEMP\nSW2(config)# vtp domain MON-RESEAU", commentaire: "Changer de domaine remet aussi le Revision à 0" },
          { os: "linux", cmd: "SW-NOUVEAU(config)# vtp mode transparent", commentaire: "Bonne pratique : mettre en Transparent par défaut avant connexion" }
        ],
        erreurs_courantes: [
          {
            symptome: "Tous les VLANs ont disparu après connexion d'un nouveau switch",
            cause: "Le nouveau switch avait un Revision Number plus élevé avec une base VLAN vide",
            solution: "Recréer tous les VLANs sur le Server. Pour l'avenir, toujours réinitialiser le Revision avant connexion."
          }
        ]
      }
    ],
    checklist: [
      "show vtp status sur les 3 switches : domaine 'MON-RESEAU', modes Server/Client/Transparent",
      "VLANs 10, 20, 30 créés sur SW1 uniquement",
      "show vlan brief sur SW2 : VLANs propagés automatiquement",
      "show vlan brief sur SW3 : VLANs absents (non appliqués en Transparent)",
      "Revision Number réinitialisé à 0 avant connexion d'un nouveau switch",
      "show vtp password : mot de passe identique sur les 3 switches"
    ],
    tags: ["vtp", "vlan", "server", "client", "transparent", "revision", "cisco", "switching"],
    date_ajout: "2026-03-01",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 11 — Réseau : Port Security
  ────────────────────────────────────────────────────── */
  {
    id: 11,
    titre: "Port Security — contrôle d'accès MAC sur switch Cisco",
    categorie: "reseau",
    niveau: "débutant",
    duree: 45,
    description: "Configurer Port Security sur les ports d'accès d'un switch Cisco pour limiter le nombre d'adresses MAC autorisées et bloquer les appareils non autorisés. On configure les trois modes de violation (Protect, Restrict, Shutdown) et on teste le comportement lors d'une connexion non autorisée.",
    objectifs: [
      "Comprendre l'utilité de Port Security (protection contre MAC flooding, branchements non autorisés)",
      "Configurer le nombre maximum d'adresses MAC par port",
      "Utiliser les sticky MAC pour apprendre automatiquement les adresses autorisées",
      "Configurer et tester les trois modes de violation",
      "Réactiver un port en err-disabled après violation"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "1x Cisco IOSv-L2" },
      { type: "reseau",   nom: "Notions de base sur les switches et les adresses MAC" }
    ],
    schema_reseau: `<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <rect x="190" y="75" width="180" height="65" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="2"/>
  <text x="280" y="100" text-anchor="middle" fill="#3B82F6" font-size="12" font-weight="bold">SW1</text>
  <text x="280" y="115" text-anchor="middle" fill="#A8A29E" font-size="8">Port Security activé</text>
  <text x="280" y="128" text-anchor="middle" fill="#78716C" font-size="7">max: 1 · sticky · shutdown</text>
  <rect x="40" y="55" width="80" height="50" rx="6" fill="#1C1917" stroke="#10B981" stroke-width="2"/>
  <text x="80" y="78" text-anchor="middle" fill="#10B981" font-size="9" font-weight="bold">PC1 ✓</text>
  <text x="80" y="92" text-anchor="middle" fill="#10B981" font-size="7">Autorisé</text>
  <line x1="120" y1="80" x2="190" y2="100" stroke="#10B981" stroke-width="2"/>
  <text x="155" y="83" text-anchor="middle" fill="#78716C" font-size="7">Gi0/1</text>
  <rect x="40" y="130" width="80" height="50" rx="6" fill="#1C1917" stroke="#EF4444" stroke-width="2"/>
  <text x="80" y="153" text-anchor="middle" fill="#EF4444" font-size="9" font-weight="bold">PC2 ✗</text>
  <text x="80" y="167" text-anchor="middle" fill="#EF4444" font-size="7">Non autorisé</text>
  <line x1="120" y1="155" x2="190" y2="120" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,3"/>
  <rect x="390" y="85" width="145" height="55" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
  <text x="462" y="108" text-anchor="middle" fill="#EF4444" font-size="9" font-weight="bold">VIOLATION ⚡</text>
  <text x="462" y="122" text-anchor="middle" fill="#A8A29E" font-size="8">Port → err-disabled</text>
  <line x1="370" y1="112" x2="390" y2="112" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Activer Port Security sur un port d'accès",
        contexte: "Port Security ne fonctionne que sur les ports en mode access. On configure le port, puis on active la sécurité avec le nombre maximum de MACs autorisées.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10", commentaire: "Port en mode access — prérequis obligatoire pour Port Security" },
          { os: "linux", cmd: "SW1(config-if)# switchport port-security\nSW1(config-if)# switchport port-security maximum 1", commentaire: "Activer Port Security — 1 seule MAC autorisée" },
          { os: "linux", cmd: "SW1# show port-security interface GigabitEthernet0/1", commentaire: "Vérifier : Port Security Enabled, Maximum 1, Violation Mode Shutdown" }
        ],
        erreurs_courantes: [
          {
            symptome: "Erreur lors de l'activation de port-security",
            cause: "Le port est en mode trunk — Port Security nécessite le mode access",
            solution: "SW1(config-if)# switchport mode access — puis réactiver port-security."
          }
        ]
      },
      {
        titre: "Étape 2 — Configurer les adresses MAC autorisées (sticky)",
        contexte: "La fonction sticky apprend automatiquement la première MAC vue sur le port et la sauvegarde dans la running-config. C'est la méthode la plus utilisée en production.",
        commandes: [
          { os: "linux", cmd: "SW1(config-if)# switchport port-security mac-address sticky", commentaire: "Sticky learning : première MAC connectée mémorisée automatiquement" },
          { os: "linux", cmd: "! Alternative : MAC statique manuelle\nSW1(config-if)# switchport port-security mac-address aabb.cc00.0100", commentaire: "Définir manuellement la MAC autorisée si connue" },
          { os: "linux", cmd: "SW1# show port-security address", commentaire: "La MAC de PC1 apparaît avec le type 'SecureSticky'" },
          { os: "linux", cmd: "SW1# show running-config | include sticky", commentaire: "Vérifier que la MAC sticky est bien dans la config" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Configurer et tester les modes de violation",
        contexte: "Trois modes définissent le comportement lors d'une violation : Protect (drop silencieux), Restrict (drop + log), Shutdown (port err-disabled). Shutdown est le plus sécurisé et le mode par défaut.",
        commandes: [
          { os: "linux", cmd: "SW1(config-if)# switchport port-security violation shutdown", commentaire: "Mode Shutdown — port désactivé si MAC non autorisée (défaut)" },
          { os: "linux", cmd: "SW1(config-if)# switchport port-security violation restrict", commentaire: "Mode Restrict — drop + compteur, port reste UP" },
          { os: "linux", cmd: "SW1(config-if)# switchport port-security violation protect", commentaire: "Mode Protect — drop silencieux (peu recommandé en prod)" },
          { os: "linux", cmd: "SW1# show port-security interface GigabitEthernet0/1", commentaire: "Security Violation Count augmente, port en err-disabled si Shutdown" },
          { os: "linux", cmd: "SW1# show interfaces GigabitEthernet0/1 status", commentaire: "Port en 'err-disabled' après violation en mode Shutdown" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Réactiver un port err-disabled",
        contexte: "Un port err-disabled ne se réactive pas tout seul — c'est voulu pour forcer l'intervention d'un admin. Deux méthodes : manuelle ou automatique avec errdisable recovery.",
        commandes: [
          { os: "linux", cmd: "SW1(config)# interface GigabitEthernet0/1\nSW1(config-if)# shutdown\nSW1(config-if)# no shutdown", commentaire: "Cycle shutdown/no shutdown pour sortir de err-disabled" },
          { os: "linux", cmd: "SW1(config)# errdisable recovery cause psecure-violation\nSW1(config)# errdisable recovery interval 300", commentaire: "Réactivation automatique toutes les 5 min après violation" },
          { os: "linux", cmd: "SW1# show errdisable recovery", commentaire: "Voir les causes activées pour la recovery automatique" },
          { os: "linux", cmd: "SW1# show port-security", commentaire: "Résumé global : tous les ports sécurisés, violations, statuts" }
        ],
        erreurs_courantes: [
          {
            symptome: "Port repasse immédiatement en err-disabled après shutdown/no shutdown",
            cause: "L'appareil non autorisé est toujours branché sur le port",
            solution: "Débrancher l'appareil non autorisé AVANT le cycle shutdown/no shutdown."
          }
        ]
      }
    ],
    checklist: [
      "show port-security interface Gi0/1 : Port Security Enabled, Maximum 1, Mode Shutdown",
      "show port-security address : MAC sticky de PC1 apprise et sauvegardée",
      "Test violation : connexion PC2 → port passe en err-disabled, compteur violation = 1",
      "show interfaces Gi0/1 status : 'err-disabled' confirmé",
      "Réactivation manuelle (shutdown/no shutdown) réussie",
      "show port-security : résumé global cohérent"
    ],
    tags: ["port-security", "mac", "sticky", "errdisabled", "violation", "cisco", "switching", "securite"],
    date_ajout: "2026-03-05",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 12 — Sécurité : ACL standard et étendue sur Cisco
  ────────────────────────────────────────────────────── */
  {
    id: 12,
    titre: "ACL standard et étendue sur routeur Cisco IOS",
    categorie: "securite",
    niveau: "intermédiaire",
    duree: 80,
    description: "Configurer des listes de contrôle d'accès (ACL) pour filtrer le trafic réseau sur un routeur Cisco. On commence par les ACL standard (filtrage sur IP source uniquement), puis les ACL étendues (filtrage sur source, destination, protocole et port). On applique les règles d'or de placement des ACL et on vérifie avec des tests de ping.",
    objectifs: [
      "Distinguer ACL standard (numérotées 1-99) et étendues (100-199)",
      "Créer des ACL numérotées et nommées avec les bonnes règles",
      "Comprendre le implicit deny en fin d'ACL et ses conséquences",
      "Appliquer les ACL sur les bonnes interfaces dans le bon sens (in/out)",
      "Vérifier le filtrage avec show ip access-lists et des tests de connectivité"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "2x Cisco IOSv (routeurs)" },
      { type: "vm",       nom: "3-4x VPCS (clients)" },
      { type: "reseau",   nom: "Routage statique ou OSPF maîtrisé" }
    ],
    schema_reseau: `<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
    <marker id="arrR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/>
    </marker>
  </defs>
  <!-- LAN Interne -->
  <rect x="20" y="30" width="150" height="190" rx="8" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="95" y="48" text-anchor="middle" fill="#3B82F6" font-size="8">LAN — 10.0.1.0/24</text>
  <rect x="35" y="60" width="70" height="35" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="70" y="78" text-anchor="middle" fill="#A8A29E" font-size="9">PC-ADMIN</text>
  <text x="70" y="90" text-anchor="middle" fill="#78716C" font-size="7">10.0.1.10</text>
  <rect x="35" y="115" width="70" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="70" y="133" text-anchor="middle" fill="#A8A29E" font-size="9">PC-USER</text>
  <text x="70" y="145" text-anchor="middle" fill="#78716C" font-size="7">10.0.1.20</text>
  <rect x="35" y="170" width="70" height="35" rx="5" fill="#1C1917" stroke="#EF4444" stroke-width="1.5"/>
  <text x="70" y="188" text-anchor="middle" fill="#A8A29E" font-size="9">PC-GUEST</text>
  <text x="70" y="200" text-anchor="middle" fill="#78716C" font-size="7">10.0.1.30</text>
  <!-- Routeur -->
  <ellipse cx="300" cy="130" rx="50" ry="35" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="300" y="125" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R1</text>
  <text x="300" y="140" text-anchor="middle" fill="#A8A29E" font-size="8">ACL appliquées</text>
  <line x1="170" y1="130" x2="250" y2="130" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr7)"/>
  <text x="210" y="122" text-anchor="middle" fill="#78716C" font-size="7">Gi0/0 (in)</text>
  <!-- Zone DMZ -->
  <rect x="430" y="30" width="170" height="190" rx="8" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="515" y="48" text-anchor="middle" fill="#EF4444" font-size="8">DMZ — 10.0.2.0/24</text>
  <rect x="450" y="60" width="80" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="490" y="78" text-anchor="middle" fill="#A8A29E" font-size="9">Serveur Web</text>
  <text x="490" y="90" text-anchor="middle" fill="#78716C" font-size="7">10.0.2.10 :80</text>
  <rect x="450" y="115" width="80" height="35" rx="5" fill="#1C1917" stroke="#EF4444" stroke-width="1.5"/>
  <text x="490" y="133" text-anchor="middle" fill="#A8A29E" font-size="9">Serveur SSH</text>
  <text x="490" y="145" text-anchor="middle" fill="#78716C" font-size="7">10.0.2.20 :22</text>
  <line x1="350" y1="130" x2="430" y2="130" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr7)"/>
  <text x="390" y="122" text-anchor="middle" fill="#78716C" font-size="7">Gi0/1 (out)</text>
  <!-- ACL label -->
  <rect x="230" y="175" width="140" height="40" rx="5" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.25)" stroke-width="1"/>
  <text x="300" y="191" text-anchor="middle" fill="#F59E0B" font-size="8" font-weight="bold">ACL étendue 110</text>
  <text x="300" y="205" text-anchor="middle" fill="#78716C" font-size="7">permit/deny par src+dst+port</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Comprendre les règles d'or des ACL",
        contexte: "Avant de configurer, deux règles fondamentales à mémoriser : (1) Toute ACL se termine par un 'deny any' implicite invisible — si le trafic ne matche aucune règle, il est bloqué. (2) Placement : ACL standard le plus PRÈS de la destination, ACL étendue le plus PRÈS de la SOURCE (pour bloquer tôt et ne pas surcharger le réseau).",
        commandes: [
          { os: "both", cmd: "# Règle d'or placement :\n# ACL STANDARD (filtre IP source) → placer PRÈS de la DESTINATION\n# ACL ÉTENDUE (filtre src+dst+port) → placer PRÈS de la SOURCE\n#\n# Sens d'application :\n# 'in'  = trafic entrant sur l'interface (avant le routage)\n# 'out' = trafic sortant de l'interface (après le routage)", commentaire: "Mémoriser ces règles avant toute configuration" }
        ],
        erreurs_courantes: [
          {
            symptome: "L'ACL bloque tout le trafic y compris le trafic autorisé",
            cause: "Oubli du 'permit' final — le deny implicite bloque tout ce qui ne matche pas",
            solution: "Toujours terminer une ACL restrictive par 'permit ip any any' si on veut autoriser le reste, ou vérifier que chaque flux légitime a bien sa règle permit."
          }
        ]
      },
      {
        titre: "Étape 2 — ACL standard : bloquer un hôte spécifique",
        contexte: "Les ACL standard (1-99 ou 1300-1999) filtrent uniquement sur l'adresse IP source. Cas d'usage : bloquer PC-GUEST (10.0.1.30) d'accéder à toute la DMZ. On la place sur Gi0/1 en direction 'out' (sortie vers la DMZ) — près de la destination.",
        commandes: [
          { os: "linux", cmd: "! ACL standard numérotée :\nR1(config)# access-list 10 deny host 10.0.1.30\nR1(config)# access-list 10 permit any", commentaire: "ACL 10 : bloquer 10.0.1.30, autoriser tout le reste" },
          { os: "linux", cmd: "! Appliquer sur Gi0/1 en sortie (vers DMZ) :\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip access-group 10 out", commentaire: "Placement : près de la destination (DMZ) en sortie" },
          { os: "linux", cmd: "R1# show ip access-lists 10", commentaire: "Vérifier l'ACL et les compteurs de matches après tests" },
          { os: "linux", cmd: "! ACL standard NOMMÉE (plus lisible) :\nR1(config)# ip access-list standard BLOQUER-GUEST\nR1(config-std-nacl)# deny host 10.0.1.30\nR1(config-std-nacl)# permit any", commentaire: "Même résultat mais avec un nom explicite" }
        ],
        erreurs_courantes: [
          {
            symptome: "L'ACL standard bloque aussi le trafic de retour",
            cause: "Les ACL sont stateless — elles ne suivent pas les sessions",
            solution: "Pour le trafic de retour, utiliser une ACL sur l'interface opposée, ou passer aux ACL étendues avec 'established' pour TCP, ou utiliser des access-lists réflexives."
          }
        ]
      },
      {
        titre: "Étape 3 — ACL étendue : filtrage précis par protocole et port",
        contexte: "Les ACL étendues (100-199 ou 2000-2699) filtrent sur source, destination, protocole (TCP/UDP/ICMP) et numéro de port. Cas d'usage : autoriser seulement PC-ADMIN à faire du SSH (port 22) vers les serveurs, autoriser HTTP (port 80) pour tous, bloquer tout le reste.",
        commandes: [
          { os: "linux", cmd: "R1(config)# ip access-list extended FILTRAGE-DMZ\nR1(config-ext-nacl)# permit tcp host 10.0.1.10 host 10.0.2.20 eq 22\nR1(config-ext-nacl)# permit tcp 10.0.1.0 0.0.0.255 host 10.0.2.10 eq 80\nR1(config-ext-nacl)# permit icmp 10.0.1.0 0.0.0.255 10.0.2.0 0.0.0.255\nR1(config-ext-nacl)# deny ip any any log", commentaire: "ACL étendue nommée : SSH admin seul, HTTP tout le monde, ICMP, deny final avec log" },
          { os: "linux", cmd: "! Appliquer sur Gi0/0 en entrée (depuis LAN) — près de la source :\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# ip access-group FILTRAGE-DMZ in", commentaire: "Placement : près de la source (LAN) en entrée" },
          { os: "linux", cmd: "R1# show ip access-lists FILTRAGE-DMZ", commentaire: "Voir les règles et les compteurs — les matches s'incrémentent à chaque paquet filtré" }
        ],
        erreurs_courantes: [
          {
            symptome: "Ping fonctionne mais SSH bloqué alors que la règle permit existe",
            cause: "L'ordre des règles dans l'ACL est incorrect — une règle deny plus haute matche avant le permit SSH",
            solution: "Les ACL sont lues séquentiellement — la première règle qui matche s'applique. Vérifier l'ordre avec 'show ip access-lists'. Supprimer et recréer l'ACL si nécessaire (pas d'insertion dans une ACL numérotée — utiliser les ACL nommées)."
          },
          {
            symptome: "Impossible de modifier une règle dans une ACL numérotée existante",
            cause: "Les ACL numérotées ne permettent pas l'édition — on ne peut qu'ajouter ou tout supprimer",
            solution: "Utiliser des ACL nommées (ip access-list extended NOM) qui supportent la numérotation de séquence et l'édition ligne par ligne : 'no 30' supprime la ligne 30."
          }
        ]
      },
      {
        titre: "Étape 4 — Vérifier, modifier et déboguer les ACL",
        contexte: "On vérifie le comportement de l'ACL avec des tests de ping/telnet depuis les différents PCs, puis on analyse les compteurs. On apprend aussi à modifier une ACL nommée sans la supprimer entièrement.",
        commandes: [
          { os: "linux", cmd: "R1# show ip access-lists", commentaire: "Afficher toutes les ACL avec leurs compteurs de matches" },
          { os: "linux", cmd: "R1# show ip interface GigabitEthernet0/0 | include access list", commentaire: "Vérifier quelle ACL est appliquée sur l'interface et dans quel sens" },
          { os: "linux", cmd: "! Modifier une ACL nommée — ajouter une règle en position 25 :\nR1(config)# ip access-list extended FILTRAGE-DMZ\nR1(config-ext-nacl)# 25 permit tcp host 10.0.1.20 host 10.0.2.20 eq 22", commentaire: "Insérer une règle entre les séquences 20 et 30 sans tout recréer" },
          { os: "linux", cmd: "! Supprimer une règle spécifique :\nR1(config)# ip access-list extended FILTRAGE-DMZ\nR1(config-ext-nacl)# no 25", commentaire: "Supprimer la règle de séquence 25" },
          { os: "linux", cmd: "R1# clear ip access-list counters FILTRAGE-DMZ", commentaire: "Remettre les compteurs à zéro pour des tests propres" },
          { os: "linux", cmd: "R1# debug ip packet detail\n# Tester le trafic depuis les PCs\nR1# undebug all", commentaire: "Observer en temps réel quels paquets sont permis/bloqués" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "ACL standard 10 ou BLOQUER-GUEST : PC-GUEST (10.0.1.30) ne peut pas pinguer la DMZ",
      "PC-ADMIN et PC-USER peuvent toujours pinguer la DMZ",
      "ACL étendue FILTRAGE-DMZ appliquée sur Gi0/0 en 'in'",
      "PC-ADMIN peut SSH vers 10.0.2.20 (port 22) — règle permit vérifiée",
      "PC-USER peut HTTP vers 10.0.2.10 (port 80) — règle permit vérifiée",
      "show ip access-lists : compteurs de matches cohérents avec les tests effectués",
      "deny ip any any log en fin d'ACL étendue — trafic bloqué visible dans les logs"
    ],
    tags: ["acl", "access-list", "filtrage", "securite", "cisco", "gns3", "tcp", "udp", "extended"],
    date_ajout: "2026-03-10",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────
     TP 13 — Sécurité : AAA + RADIUS sur Cisco IOS
  ────────────────────────────────────────────────────── */
  {
    id: 13,
    titre: "AAA et authentification RADIUS sur Cisco IOS",
    categorie: "securite",
    niveau: "avancé",
    duree: 90,
    description: "Configurer l'authentification centralisée AAA (Authentication, Authorization, Accounting) sur un routeur Cisco IOS avec un serveur RADIUS. Les identifiants des administrateurs réseau sont vérifiés sur le serveur RADIUS plutôt que stockés localement sur chaque équipement — indispensable en environnement multi-équipements.",
    objectifs: [
      "Comprendre le modèle AAA et la différence entre RADIUS et TACACS+",
      "Installer et configurer un serveur RADIUS (FreeRADIUS sur Linux ou GNS3)",
      "Configurer l'authentification AAA sur IOS pour les accès VTY (SSH/Telnet) et console",
      "Définir un fallback local en cas d'indisponibilité du serveur RADIUS",
      "Tester la connexion avec des comptes RADIUS et vérifier l'accounting"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+" },
      { type: "vm",       nom: "1x Cisco IOSv (routeur à sécuriser)" },
      { type: "vm",       nom: "1x VM Linux Debian/Ubuntu (serveur RADIUS)" },
      { type: "reseau",   nom: "SSH configuré sur le routeur Cisco" },
      { type: "reseau",   nom: "Connectivité IP entre le routeur et la VM Linux" }
    ],
    schema_reseau: `<svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- Admin -->
  <rect x="20" y="100" width="80" height="50" rx="6" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="60" y="122" text-anchor="middle" fill="#A8A29E" font-size="9">Admin</text>
  <text x="60" y="136" text-anchor="middle" fill="#78716C" font-size="7">SSH client</text>
  <!-- Routeur -->
  <ellipse cx="260" cy="125" rx="55" ry="38" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="260" y="118" text-anchor="middle" fill="#F59E0B" font-size="11" font-weight="bold">R1</text>
  <text x="260" y="133" text-anchor="middle" fill="#A8A29E" font-size="8">AAA Client</text>
  <text x="260" y="145" text-anchor="middle" fill="#78716C" font-size="7">192.168.1.1</text>
  <line x1="100" y1="125" x2="205" y2="125" stroke="#3B82F6" stroke-width="2" marker-end="url(#arr8)"/>
  <text x="152" y="117" text-anchor="middle" fill="#3B82F6" font-size="7">SSH :22</text>
  <!-- Serveur RADIUS -->
  <rect x="420" y="75" width="170" height="100" rx="8" fill="#1C1917" stroke="#10B981" stroke-width="2"/>
  <text x="505" y="100" text-anchor="middle" fill="#10B981" font-size="11" font-weight="bold">FreeRADIUS</text>
  <text x="505" y="115" text-anchor="middle" fill="#A8A29E" font-size="8">192.168.1.100</text>
  <text x="505" y="130" text-anchor="middle" fill="#78716C" font-size="7">Port UDP 1812 (auth)</text>
  <text x="505" y="143" text-anchor="middle" fill="#78716C" font-size="7">Port UDP 1813 (accounting)</text>
  <text x="505" y="158" text-anchor="middle" fill="#78716C" font-size="7">Secret: cisco-radius-secret</text>
  <!-- Lien RADIUS -->
  <line x1="315" y1="110" x2="420" y2="110" stroke="#10B981" stroke-width="2" marker-end="url(#arr8)"/>
  <line x1="420" y1="135" x2="315" y2="135" stroke="#10B981" stroke-width="2" marker-end="url(#arr8)"/>
  <text x="367" y="103" text-anchor="middle" fill="#10B981" font-size="7">Access-Request</text>
  <text x="367" y="148" text-anchor="middle" fill="#10B981" font-size="7">Access-Accept/Reject</text>
  <!-- Flux AAA -->
  <rect x="150" y="185" width="320" height="50" rx="6" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" stroke-width="1"/>
  <text x="310" y="205" text-anchor="middle" fill="#F59E0B" font-size="8" font-weight="bold">Flux AAA</text>
  <text x="310" y="220" text-anchor="middle" fill="#78716C" font-size="7">1.Admin SSH → R1  2.R1 envoie Access-Request RADIUS  3.RADIUS répond Accept/Reject</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Installer et configurer FreeRADIUS sur Debian/Ubuntu",
        contexte: "FreeRADIUS est le serveur RADIUS open-source le plus utilisé. On l'installe sur la VM Linux, on configure le secret partagé avec le routeur Cisco (NAS client), et on crée les comptes utilisateurs qui pourront s'authentifier.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install freeradius -y", commentaire: "Installer FreeRADIUS" },
          { os: "linux", cmd: "sudo nano /etc/freeradius/3.0/clients.conf", commentaire: "Déclarer le routeur Cisco comme client RADIUS autorisé" },
          { os: "linux", cmd: "# Ajouter dans clients.conf :\nclient cisco-r1 {\n    ipaddr          = 192.168.1.1\n    secret          = cisco-radius-secret\n    shortname       = R1\n    nas_type        = cisco\n}", commentaire: "Déclarer R1 avec son IP et le secret partagé" },
          { os: "linux", cmd: "sudo nano /etc/freeradius/3.0/users", commentaire: "Ajouter les comptes utilisateurs réseau" },
          { os: "linux", cmd: "# Ajouter dans users :\nadmin-net   Cleartext-Password := \"AdminPass123\"\n            Service-Type = NAS-Prompt-User,\n            Cisco-AVPair = \"shell:priv-lvl=15\"\n\nop-reseau   Cleartext-Password := \"OpPass456\"\n            Service-Type = NAS-Prompt-User,\n            Cisco-AVPair = \"shell:priv-lvl=7\"", commentaire: "admin-net : accès niveau 15 (enable) / op-reseau : niveau 7 (limité)" },
          { os: "linux", cmd: "sudo freeradius -X", commentaire: "Démarrer FreeRADIUS en mode debug pour voir les erreurs en temps réel" },
          { os: "linux", cmd: "# Dans un autre terminal — tester RADIUS localement :\nradtest admin-net AdminPass123 127.0.0.1 0 cisco-radius-secret", commentaire: "Test local : doit retourner 'Access-Accept'" }
        ],
        erreurs_courantes: [
          {
            symptome: "radtest retourne 'Access-Reject'",
            cause: "Mot de passe incorrect dans users, ou le compte n'existe pas",
            solution: "Vérifier l'orthographe exacte dans /etc/freeradius/3.0/users. FreeRADIUS est sensible à la casse et aux espaces. Relancer avec 'sudo freeradius -X' pour voir les logs détaillés."
          },
          {
            symptome: "radtest timeout — pas de réponse",
            cause: "FreeRADIUS n'écoute pas sur l'interface, ou firewall bloque UDP 1812",
            solution: "sudo ufw allow 1812/udp && sudo ufw allow 1813/udp. Vérifier que FreeRADIUS écoute : ss -ulnp | grep 1812"
          }
        ]
      },
      {
        titre: "Étape 2 — Configurer SSH sur le routeur Cisco",
        contexte: "Avant d'activer AAA, on s'assure que SSH est correctement configuré sur R1. Un compte local admin doit exister comme fallback en cas d'indisponibilité RADIUS — sans ce fallback, une panne RADIUS vous locke hors de l'équipement.",
        commandes: [
          { os: "linux", cmd: "R1(config)# hostname R1\nR1(config)# ip domain-name lab.local\nR1(config)# crypto key generate rsa modulus 2048", commentaire: "Prérequis SSH : hostname, domaine, clé RSA 2048 bits" },
          { os: "linux", cmd: "R1(config)# ip ssh version 2\nR1(config)# ip ssh time-out 60\nR1(config)# ip ssh authentication-retries 3", commentaire: "Forcer SSHv2 uniquement" },
          { os: "linux", cmd: "! Compte local de fallback OBLIGATOIRE :\nR1(config)# username admin privilege 15 secret FallbackPass789", commentaire: "Compte local utilisé si RADIUS est injoignable" },
          { os: "linux", cmd: "R1# show ip ssh", commentaire: "Vérifier SSH version 2 activé et opérationnel" }
        ],
        erreurs_courantes: [
          {
            symptome: "Crypto key generate rsa échoue ou demande confirmation bizarre",
            cause: "hostname ou ip domain-name non configuré",
            solution: "Ces deux commandes sont obligatoires avant la génération de clé RSA. Sans elles, IOS ne peut pas nommer la clé."
          }
        ]
      },
      {
        titre: "Étape 3 — Configurer AAA sur le routeur Cisco",
        contexte: "On configure le serveur RADIUS, puis on active AAA et on définit les méthodes d'authentification. L'ordre des méthodes définit le fallback : 'group radius local' signifie essayer RADIUS d'abord, puis le compte local si RADIUS est injoignable.",
        commandes: [
          { os: "linux", cmd: "! Déclarer le serveur RADIUS :\nR1(config)# radius server FREERADIUS\nR1(config-radius-server)# address ipv4 192.168.1.100 auth-port 1812 acct-port 1813\nR1(config-radius-server)# key cisco-radius-secret\nR1(config-radius-server)# exit", commentaire: "Déclarer FreeRADIUS avec son IP, ports et secret partagé" },
          { os: "linux", cmd: "! Créer un groupe de serveurs RADIUS :\nR1(config)# aaa group server radius GROUPE-RADIUS\nR1(config-sg-radius)# server name FREERADIUS\nR1(config-sg-radius)# exit", commentaire: "Grouper les serveurs RADIUS pour les référencer dans les policies AAA" },
          { os: "linux", cmd: "! Activer AAA :\nR1(config)# aaa new-model", commentaire: "ATTENTION : active immédiatement AAA — avoir le fallback local configuré AVANT" },
          { os: "linux", cmd: "! Définir les méthodes d'authentification :\nR1(config)# aaa authentication login METHODE-SSH group GROUPE-RADIUS local\nR1(config)# aaa authentication login METHODE-CONSOLE local", commentaire: "SSH : RADIUS puis local en fallback / Console : local uniquement" },
          { os: "linux", cmd: "! Appliquer sur les lignes VTY et console :\nR1(config)# line vty 0 4\nR1(config-line)# login authentication METHODE-SSH\nR1(config-line)# transport input ssh\nR1(config)# line console 0\nR1(config-line)# login authentication METHODE-CONSOLE", commentaire: "Lier les méthodes AAA aux lignes d'accès" }
        ],
        erreurs_courantes: [
          {
            symptome: "Après 'aaa new-model', plus aucun accès possible",
            cause: "aaa new-model a été activé SANS définir les méthodes d'authentification ni avoir de compte local",
            solution: "Accéder par la console physique (ou GNS3 console). Sur la console : username admin privilege 15 secret X, puis aaa authentication login default local. Ne jamais activer aaa new-model sans fallback local prêt."
          },
          {
            symptome: "SSH accepte la connexion mais RADIUS n'est jamais consulté",
            cause: "La méthode AAA n'est pas appliquée sur les lignes VTY",
            solution: "Vérifier 'show running-config | section line vty' — la ligne 'login authentication METHODE-SSH' doit apparaître."
          }
        ]
      },
      {
        titre: "Étape 4 — Configurer l'Authorization et l'Accounting",
        contexte: "L'Authorization détermine ce que l'utilisateur peut faire après authentification (commandes disponibles, niveau de privilège). L'Accounting enregistre toutes les actions pour audit. Ces deux composantes complètent le A et le A de AAA.",
        commandes: [
          { os: "linux", cmd: "! Authorization — niveau exec automatique depuis RADIUS :\nR1(config)# aaa authorization exec AUTHZ-EXEC group GROUPE-RADIUS local\nR1(config)# line vty 0 4\nR1(config-line)# authorization exec AUTHZ-EXEC", commentaire: "Le niveau privilege (1-15) est attribué par RADIUS via Cisco-AVPair" },
          { os: "linux", cmd: "! Accounting — enregistrer les sessions exec :\nR1(config)# aaa accounting exec ACCOUNT-EXEC start-stop group GROUPE-RADIUS\nR1(config)# line vty 0 4\nR1(config-line)# accounting exec ACCOUNT-EXEC", commentaire: "Log start (connexion) et stop (déconnexion) envoyés au serveur RADIUS" },
          { os: "linux", cmd: "R1# show aaa servers", commentaire: "Vérifier le statut des serveurs RADIUS : requêtes envoyées, réponses reçues" },
          { os: "linux", cmd: "R1# show aaa sessions", commentaire: "Sessions AAA actives en ce moment" },
          { os: "linux", cmd: "R1# debug aaa authentication\nR1# debug radius\n# Se connecter en SSH avec un compte RADIUS\nR1# undebug all", commentaire: "Observer les échanges AAA/RADIUS en temps réel" }
        ],
        erreurs_courantes: [
          {
            symptome: "Utilisateur RADIUS authentifié mais niveau privilege 1 (pas d'accès admin)",
            cause: "L'attribut Cisco-AVPair 'shell:priv-lvl=15' n'est pas envoyé par FreeRADIUS",
            solution: "Vérifier dans /etc/freeradius/3.0/users que la ligne 'Cisco-AVPair = \"shell:priv-lvl=15\"' est bien présente pour le compte. Relancer FreeRADIUS. Sur le routeur : 'aaa authorization exec' doit aussi être configuré."
          }
        ]
      },
      {
        titre: "Étape 5 — Tester et valider",
        contexte: "On teste les différents scénarios : connexion avec compte RADIUS valide, connexion avec mauvais mot de passe, connexion avec compte local (fallback), et comportement si le serveur RADIUS est coupé.",
        commandes: [
          { os: "linux", cmd: "# Depuis la machine admin :\nssh admin-net@192.168.1.1", commentaire: "Test 1 : compte RADIUS valide — doit se connecter en priv 15" },
          { os: "linux", cmd: "ssh op-reseau@192.168.1.1", commentaire: "Test 2 : compte RADIUS niveau 7 — accès limité" },
          { os: "linux", cmd: "ssh mauvais-user@192.168.1.1", commentaire: "Test 3 : compte inexistant — doit refuser (Access-Reject)" },
          { os: "linux", cmd: "# Sur la VM FreeRADIUS : couper le service\nsudo systemctl stop freeradius\n# Puis retenter depuis admin :\nssh admin@192.168.1.1", commentaire: "Test 4 : RADIUS down → fallback sur compte local 'admin'" },
          { os: "linux", cmd: "R1# show aaa servers\nR1# show radius statistics", commentaire: "Vérifier les compteurs : Access-Requests, Access-Accepts, Access-Rejects" },
          { os: "linux", cmd: "# Redémarrer FreeRADIUS :\nsudo systemctl start freeradius\nsudo systemctl status freeradius", commentaire: "Rétablir le serveur RADIUS après les tests" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le fallback local ne fonctionne pas quand RADIUS est down",
            cause: "La méthode AAA ne contient pas 'local' en fallback, ou le compte local n'existe pas",
            solution: "Vérifier 'show running-config | include aaa authentication' — 'local' doit apparaître après 'group GROUPE-RADIUS'. Vérifier aussi que le compte local existe avec 'show running-config | include username'."
          }
        ]
      }
    ],
    checklist: [
      "FreeRADIUS installé et 'radtest admin-net AdminPass123 127.0.0.1 0 cisco-radius-secret' retourne Access-Accept",
      "SSH fonctionnel sur R1 (version 2, clé RSA 2048 générée)",
      "Compte local de fallback 'admin' configuré avec privilege 15",
      "aaa new-model activé avec méthodes d'authentification définies",
      "SSH avec compte RADIUS 'admin-net' : connexion réussie en privilege 15",
      "SSH avec RADIUS down : fallback sur compte local fonctionnel",
      "show aaa servers : serveur RADIUS joignable, compteurs Access-Accept cohérents",
      "Accounting configuré : logs de session envoyés au serveur RADIUS"
    ],
    tags: ["aaa", "radius", "freeradius", "authentification", "ssh", "cisco", "securite", "accounting", "authorization"],
    date_ajout: "2026-03-15",
    source: "École"
  },


  /* ── TP 14 — Supervision : Zabbix ── */
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

  /* ── TP 15 — Supervision : SNMP v2c et v3 ── */
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

  /* ── TP 16 — Supervision : Syslog centralisé rsyslog ── */
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
  }

,

  /* ── TP 17 — Automatisation : Docker installation + premiers conteneurs ── */
  {
    id: 17,
    titre: "Docker — installation et premiers conteneurs sur Linux",
    categorie: "automatisation",
    niveau: "débutant",
    duree: 75,
    description: "Installer Docker Engine sur Debian/Ubuntu, comprendre l'architecture (images, conteneurs, registry), lancer les premiers conteneurs, gérer leur cycle de vie et créer une première image personnalisée avec un Dockerfile.",
    objectifs: [
      "Installer Docker Engine depuis le dépôt officiel",
      "Comprendre la différence entre image et conteneur",
      "Lancer, inspecter et supprimer des conteneurs",
      "Mapper des ports et monter des volumes",
      "Créer une image personnalisée avec un Dockerfile"
    ],
    prerequis: [
      { type: "vm", nom: "VM Debian 12 ou Ubuntu 22.04 LTS" },
      { type: "reseau", nom: "Accès Internet pour télécharger les images Docker Hub" },
      { type: "reseau", nom: "Notions de base Linux (commandes, fichiers, droits)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer Docker Engine",
        contexte: "On installe Docker depuis le dépôt officiel Docker — pas depuis les paquets Debian/Ubuntu par défaut qui sont souvent obsolètes. On ajoute aussi l'utilisateur courant au groupe docker pour éviter sudo.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install -y ca-certificates curl gnupg", commentaire: "Installer les dépendances" },
          { os: "linux", cmd: "sudo install -m 0755 -d /etc/apt/keyrings\ncurl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg\nsudo chmod a+r /etc/apt/keyrings/docker.gpg", commentaire: "Ajouter la clé GPG officielle Docker" },
          { os: "linux", cmd: "echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo $VERSION_CODENAME) stable\" | sudo tee /etc/apt/sources.list.d/docker.list\nsudo apt update", commentaire: "Ajouter le dépôt Docker officiel" },
          { os: "linux", cmd: "sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin", commentaire: "Installer Docker Engine + Compose plugin" },
          { os: "linux", cmd: "sudo systemctl enable docker --now\nsudo systemctl status docker", commentaire: "Démarrer Docker et activer au boot" },
          { os: "linux", cmd: "sudo usermod -aG docker $USER\nnewgrp docker", commentaire: "Ajouter l'utilisateur au groupe docker — évite sudo" },
          { os: "linux", cmd: "docker version\ndocker info", commentaire: "Vérifier l'installation — version client et serveur" }
        ],
        erreurs_courantes: [
          {
            symptome: "Permission denied sur /var/run/docker.sock",
            cause: "L'utilisateur n'est pas dans le groupe docker",
            solution: "sudo usermod -aG docker $USER puis se reconnecter (logout/login). Ou utiliser newgrp docker pour la session courante."
          }
        ]
      },
      {
        titre: "Étape 2 — Premier conteneur et commandes de base",
        contexte: "On lance les premiers conteneurs pour comprendre le cycle de vie : pulled, created, running, stopped, removed. La commande docker run combine pull + create + start en une seule commande.",
        commandes: [
          { os: "linux", cmd: "docker run hello-world", commentaire: "Premier conteneur — vérifie que Docker fonctionne end-to-end" },
          { os: "linux", cmd: "docker run -it ubuntu:22.04 bash", commentaire: "Conteneur interactif Ubuntu — -i (stdin) -t (terminal)" },
          { os: "linux", cmd: "docker run -d --name mon-nginx -p 8080:80 nginx", commentaire: "Nginx en arrière-plan : -d (detach), port 8080 hôte → 80 conteneur" },
          { os: "linux", cmd: "docker ps\ndocker ps -a", commentaire: "Lister conteneurs actifs / tous les conteneurs" },
          { os: "linux", cmd: "docker logs mon-nginx\ndocker logs -f mon-nginx", commentaire: "Afficher les logs / suivre en temps réel (-f = follow)" },
          { os: "linux", cmd: "docker exec -it mon-nginx bash", commentaire: "Ouvrir un shell dans un conteneur en cours d'exécution" },
          { os: "linux", cmd: "docker stop mon-nginx\ndocker start mon-nginx\ndocker rm mon-nginx", commentaire: "Arrêter / démarrer / supprimer un conteneur" },
          { os: "linux", cmd: "docker images\ndocker image ls\ndocker image rm nginx", commentaire: "Lister et supprimer des images locales" }
        ],
        erreurs_courantes: [
          {
            symptome: "Port already in use — bind: address already in use",
            cause: "Le port 8080 est déjà utilisé sur l'hôte",
            solution: "Changer le port hôte : -p 8081:80. Vérifier : ss -tlnp | grep 8080"
          }
        ]
      },
      {
        titre: "Étape 3 — Volumes et persistance des données",
        contexte: "Par défaut les données dans un conteneur sont perdues à sa suppression. Les volumes Docker permettent de persister les données et de les partager entre conteneurs ou avec l'hôte.",
        commandes: [
          { os: "linux", cmd: "# Volume nommé (géré par Docker) :\ndocker volume create mon-volume\ndocker volume ls\ndocker volume inspect mon-volume", commentaire: "Créer et inspecter un volume nommé" },
          { os: "linux", cmd: "docker run -d --name db-mysql \\\n  -e MYSQL_ROOT_PASSWORD=rootpass \\\n  -e MYSQL_DATABASE=madb \\\n  -v mon-volume:/var/lib/mysql \\\n  mysql:8.0", commentaire: "MySQL avec volume persistant — données survivent au rm du conteneur" },
          { os: "linux", cmd: "# Bind mount (dossier hôte → conteneur) :\ndocker run -d --name nginx-custom \\\n  -p 8080:80 \\\n  -v $(pwd)/html:/usr/share/nginx/html:ro \\\n  nginx", commentaire: "Servir des fichiers locaux dans Nginx — :ro = lecture seule" },
          { os: "linux", cmd: "docker volume rm mon-volume\ndocker volume prune", commentaire: "Supprimer un volume / nettoyer tous les volumes non utilisés" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Créer une image avec un Dockerfile",
        contexte: "Un Dockerfile décrit les instructions pour construire une image personnalisée. On crée une image Nginx avec une page HTML custom et une configuration modifiée.",
        commandes: [
          { os: "linux", cmd: "mkdir mon-site && cd mon-site", commentaire: "Créer un répertoire de travail" },
          { os: "linux", cmd: "# Créer index.html :\necho '<h1>Mon site Docker</h1>' > index.html", commentaire: "Page HTML simple" },
          { os: "linux", cmd: "# Créer Dockerfile :\nFROM nginx:alpine\nLABEL maintainer=\"admin@lab.local\"\nCOPY index.html /usr/share/nginx/html/index.html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]", commentaire: "Dockerfile : partir de nginx:alpine, copier la page, exposer le port 80" },
          { os: "linux", cmd: "docker build -t mon-site:1.0 .", commentaire: "Construire l'image — le . = contexte de build (répertoire courant)" },
          { os: "linux", cmd: "docker images | grep mon-site", commentaire: "Vérifier que l'image est créée" },
          { os: "linux", cmd: "docker run -d -p 8080:80 --name mon-site-ctn mon-site:1.0\ncurl http://localhost:8080", commentaire: "Lancer le conteneur et tester" },
          { os: "linux", cmd: "docker history mon-site:1.0", commentaire: "Voir les couches (layers) de l'image et leur taille" }
        ],
        erreurs_courantes: [
          {
            symptome: "COPY failed: file not found in build context",
            cause: "Le fichier à copier n'est pas dans le répertoire de contexte (le . du build)",
            solution: "Vérifier que index.html est bien dans le même répertoire que le Dockerfile. Le contexte de build inclut tous les fichiers du répertoire courant."
          }
        ]
      }
    ],
    checklist: [
      "docker version : client et serveur affichent la même version",
      "docker run hello-world : message de succès affiché",
      "Conteneur Nginx lancé sur port 8080 : curl http://localhost:8080 retourne la page",
      "docker ps : conteneur Nginx visible en Running",
      "Volume MySQL créé et monté : données persistantes après rm + recreate",
      "Image mon-site:1.0 construite avec Dockerfile : docker images la liste",
      "Conteneur mon-site-ctn : page HTML custom visible sur port 8080"
    ],
    tags: ["docker", "conteneur", "dockerfile", "image", "volume", "nginx", "linux", "automatisation"],
    date_ajout: "2026-04-01",
    source: "Personnel"
  },

  /* ── TP 18 — Automatisation : Docker Compose ── */
  {
    id: 18,
    titre: "Docker Compose — stack multi-conteneurs WordPress + MySQL",
    categorie: "automatisation",
    niveau: "intermédiaire",
    duree: 60,
    description: "Déployer une stack applicative complète avec Docker Compose : WordPress + MySQL + phpMyAdmin. Un seul fichier compose.yml définit tous les services, leurs dépendances, volumes et réseau. On apprend à gérer le cycle de vie de la stack et à déboguer.",
    objectifs: [
      "Comprendre la structure d'un fichier compose.yml",
      "Définir des services, volumes et réseaux dans Compose",
      "Gérer les dépendances entre conteneurs (depends_on)",
      "Déployer, mettre à jour et supprimer une stack Compose",
      "Utiliser les variables d'environnement et les fichiers .env"
    ],
    prerequis: [
      { type: "logiciel", nom: "Docker Engine installé (TP 17)" },
      { type: "logiciel", nom: "Docker Compose plugin (inclus avec Docker Engine)" },
      { type: "reseau", nom: "Ports 8080 et 8081 disponibles sur l'hôte" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Structure du fichier compose.yml",
        contexte: "Un fichier compose.yml définit la stack complète : services (conteneurs), volumes (persistance) et networks (communication entre conteneurs). Docker Compose crée automatiquement un réseau isolé pour la stack.",
        commandes: [
          { os: "linux", cmd: "mkdir wordpress-stack && cd wordpress-stack", commentaire: "Créer le répertoire de la stack" },
          { os: "linux", cmd: "# Créer .env avec les variables sensibles :\nDB_NAME=wordpress\nDB_USER=wpuser\nDB_PASSWORD=WpPass123\nDB_ROOT_PASSWORD=RootPass123\nWP_PORT=8080\nPMA_PORT=8081", commentaire: "Variables d'environnement dans .env — ne jamais committer en Git !" },
          { os: "linux", cmd: "# Créer compose.yml :\nservices:\n\n  db:\n    image: mysql:8.0\n    container_name: wp-mysql\n    restart: unless-stopped\n    environment:\n      MYSQL_DATABASE: ${DB_NAME}\n      MYSQL_USER: ${DB_USER}\n      MYSQL_PASSWORD: ${DB_PASSWORD}\n      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}\n    volumes:\n      - db-data:/var/lib/mysql\n    networks:\n      - wp-net\n\n  wordpress:\n    image: wordpress:latest\n    container_name: wp-app\n    restart: unless-stopped\n    depends_on:\n      - db\n    ports:\n      - \"${WP_PORT}:80\"\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_NAME: ${DB_NAME}\n      WORDPRESS_DB_USER: ${DB_USER}\n      WORDPRESS_DB_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - wp-data:/var/www/html\n    networks:\n      - wp-net\n\n  phpmyadmin:\n    image: phpmyadmin:latest\n    container_name: wp-pma\n    restart: unless-stopped\n    depends_on:\n      - db\n    ports:\n      - \"${PMA_PORT}:80\"\n    environment:\n      PMA_HOST: db\n      PMA_USER: ${DB_USER}\n      PMA_PASSWORD: ${DB_PASSWORD}\n    networks:\n      - wp-net\n\nvolumes:\n  db-data:\n  wp-data:\n\nnetworks:\n  wp-net:\n    driver: bridge", commentaire: "Stack complète : MySQL + WordPress + phpMyAdmin" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Lancer et gérer la stack",
        contexte: "Avec un seul fichier compose.yml, on lance toute la stack en une commande. Docker Compose respecte les dépendances (depends_on) et crée automatiquement le réseau et les volumes.",
        commandes: [
          { os: "linux", cmd: "docker compose up -d", commentaire: "Lancer toute la stack en arrière-plan (-d)" },
          { os: "linux", cmd: "docker compose ps", commentaire: "État de tous les services de la stack" },
          { os: "linux", cmd: "docker compose logs -f", commentaire: "Suivre les logs de tous les services en temps réel" },
          { os: "linux", cmd: "docker compose logs wordpress", commentaire: "Logs d'un service spécifique uniquement" },
          { os: "linux", cmd: "# Accéder à WordPress :\n# http://localhost:8080 → assistant installation WordPress\n# http://localhost:8081 → phpMyAdmin", commentaire: "Vérifier que les deux interfaces sont accessibles" },
          { os: "linux", cmd: "docker compose exec wordpress bash", commentaire: "Ouvrir un shell dans le conteneur WordPress" }
        ],
        erreurs_courantes: [
          {
            symptome: "WordPress affiche erreur de connexion DB au démarrage",
            cause: "MySQL n'est pas encore prêt quand WordPress démarre (depends_on attend le start, pas le ready)",
            solution: "Attendre 20-30 secondes que MySQL initialise sa DB. En prod, utiliser healthcheck dans compose.yml pour attendre que MySQL soit réellement prêt."
          }
        ]
      },
      {
        titre: "Étape 3 — Mettre à jour et scaler la stack",
        contexte: "Docker Compose permet de mettre à jour les images, de recréer les conteneurs sans perdre les données (volumes persistants) et de scaler les services sans état.",
        commandes: [
          { os: "linux", cmd: "docker compose pull", commentaire: "Télécharger les nouvelles versions des images" },
          { os: "linux", cmd: "docker compose up -d --no-deps wordpress", commentaire: "Recréer uniquement le conteneur WordPress sans toucher MySQL" },
          { os: "linux", cmd: "docker compose restart wordpress", commentaire: "Redémarrer un service spécifique" },
          { os: "linux", cmd: "docker compose down", commentaire: "Arrêter et supprimer les conteneurs (les volumes sont conservés)" },
          { os: "linux", cmd: "docker compose down -v", commentaire: "Arrêter ET supprimer les volumes — ATTENTION : perte des données !" },
          { os: "linux", cmd: "docker compose config", commentaire: "Valider et afficher la config Compose résolue (variables .env injectées)" }
        ],
        erreurs_courantes: [
          {
            symptome: "docker compose down -v puis up : WordPress demande la réinstallation",
            cause: "Les volumes ont été supprimés avec -v — les données MySQL et WP sont perdues",
            solution: "Ne jamais utiliser -v en production. Pour reset propre en dev seulement. Toujours faire des backups : docker exec wp-mysql mysqldump -u root -p wordpress > backup.sql"
          }
        ]
      },
      {
        titre: "Étape 4 — Healthcheck et dépendances robustes",
        contexte: "depends_on attend que le conteneur démarre, pas qu'il soit prêt. Pour attendre que MySQL accepte les connexions, on utilise un healthcheck. C'est la bonne pratique en production.",
        commandes: [
          { os: "linux", cmd: "# Modifier le service db dans compose.yml pour ajouter un healthcheck :\n  db:\n    image: mysql:8.0\n    healthcheck:\n      test: [\"CMD\", \"mysqladmin\", \"ping\", \"-h\", \"localhost\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n      start_period: 30s", commentaire: "Healthcheck MySQL : tester toutes les 10s, 5 tentatives max" },
          { os: "linux", cmd: "# Modifier wordpress pour attendre que db soit healthy :\n  wordpress:\n    depends_on:\n      db:\n        condition: service_healthy", commentaire: "WordPress attend que MySQL soit healthy avant de démarrer" },
          { os: "linux", cmd: "docker compose up -d\ndocker compose ps", commentaire: "Relancer — WordPress attend maintenant que MySQL soit prêt" },
          { os: "linux", cmd: "docker inspect wp-mysql | grep -A 10 Health", commentaire: "Vérifier le statut de santé du conteneur MySQL" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "compose.yml et .env créés dans le répertoire wordpress-stack",
      "docker compose up -d : 3 services démarrés (db, wordpress, phpmyadmin)",
      "http://localhost:8080 : assistant installation WordPress accessible",
      "http://localhost:8081 : phpMyAdmin accessible et connecté à MySQL",
      "docker compose down puis up : données WordPress conservées (volumes)",
      "Healthcheck MySQL configuré : WordPress attend service_healthy"
    ],
    tags: ["docker-compose", "compose", "wordpress", "mysql", "phpmyadmin", "stack", "volume", "automatisation"],
    date_ajout: "2026-04-05",
    source: "Personnel"
  },

  /* ── TP 19 — Automatisation : Ansible playbook de base ── */
  {
    id: 19,
    titre: "Ansible — inventaire, playbooks et déploiement automatisé",
    categorie: "automatisation",
    niveau: "intermédiaire",
    duree: 90,
    description: "Installer Ansible sur un nœud de contrôle, configurer un inventaire de serveurs, écrire des playbooks pour automatiser la configuration de serveurs Linux : installation de paquets, configuration de services, déploiement de fichiers et gestion des utilisateurs.",
    objectifs: [
      "Installer Ansible et configurer l'accès SSH sans mot de passe vers les hôtes",
      "Créer un inventaire statique avec groupes d'hôtes",
      "Écrire et exécuter des playbooks avec les modules essentiels",
      "Utiliser les variables, les handlers et les templates Jinja2",
      "Comprendre les idempotences et les bonnes pratiques Ansible"
    ],
    prerequis: [
      { type: "vm", nom: "1x VM Debian/Ubuntu (nœud de contrôle Ansible)" },
      { type: "vm", nom: "2x VM Debian/Ubuntu (hôtes gérés)" },
      { type: "reseau", nom: "SSH fonctionnel entre le contrôleur et les hôtes" },
      { type: "reseau", nom: "Python 3 installé sur les hôtes gérés" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer Ansible et configurer SSH",
        contexte: "Ansible fonctionne en agentless — pas besoin d'installer de logiciel sur les hôtes gérés. Il se connecte via SSH. On installe Ansible sur le nœud de contrôle et on configure l'authentification par clé pour éviter les mots de passe.",
        commandes: [
          { os: "linux", cmd: "# Sur le nœud de contrôle :\nsudo apt update && sudo apt install -y ansible\nansible --version", commentaire: "Installer Ansible depuis les dépôts Debian" },
          { os: "linux", cmd: "# Générer une clé SSH dédiée Ansible :\nssh-keygen -t ed25519 -C \"ansible-control\" -f ~/.ssh/ansible_key -N \"\"", commentaire: "Clé sans passphrase pour les connexions automatisées" },
          { os: "linux", cmd: "# Copier la clé vers les hôtes gérés :\nssh-copy-id -i ~/.ssh/ansible_key.pub user@192.168.1.21\nssh-copy-id -i ~/.ssh/ansible_key.pub user@192.168.1.22", commentaire: "Déposer la clé publique sur chaque hôte géré" },
          { os: "linux", cmd: "# Tester la connexion SSH :\nssh -i ~/.ssh/ansible_key user@192.168.1.21 \"hostname\"", commentaire: "Doit retourner le hostname sans demander de mot de passe" }
        ],
        erreurs_courantes: [
          {
            symptome: "Ansible retourne UNREACHABLE sur les hôtes",
            cause: "La clé SSH n'est pas correctement déployée ou le port SSH est différent",
            solution: "Vérifier avec ssh -i ~/.ssh/ansible_key -v user@IP pour voir le détail de la connexion. Ajouter ansible_port=2222 dans l'inventaire si le port SSH est différent."
          }
        ]
      },
      {
        titre: "Étape 2 — Créer l'inventaire et la configuration Ansible",
        contexte: "L'inventaire définit les hôtes et groupes à gérer. On crée aussi ansible.cfg pour éviter de répéter les options à chaque commande.",
        commandes: [
          { os: "linux", cmd: "mkdir ~/ansible-lab && cd ~/ansible-lab", commentaire: "Répertoire de travail Ansible" },
          { os: "linux", cmd: "# Créer ansible.cfg :\n[defaults]\ninventory = inventory.yml\nremote_user = user\nprivate_key_file = ~/.ssh/ansible_key\nhost_key_checking = False\nretry_files_enabled = False", commentaire: "Config globale — évite de répéter les options en CLI" },
          { os: "linux", cmd: "# Créer inventory.yml :\nall:\n  children:\n    webservers:\n      hosts:\n        web01:\n          ansible_host: 192.168.1.21\n        web02:\n          ansible_host: 192.168.1.22\n    dbservers:\n      hosts:\n        db01:\n          ansible_host: 192.168.1.23\n  vars:\n    ansible_python_interpreter: /usr/bin/python3", commentaire: "Inventaire YAML avec groupes webservers et dbservers" },
          { os: "linux", cmd: "# Tester la connexion vers tous les hôtes :\nansible all -m ping", commentaire: "Module ping — vérifie SSH + Python sur tous les hôtes" },
          { os: "linux", cmd: "ansible webservers -m ping\nansible all -m gather_facts --limit web01", commentaire: "Ping un groupe / collecter les facts d'un hôte" }
        ],
        erreurs_courantes: [
          {
            symptome: "ansible all -m ping retourne FAILED — Python not found",
            cause: "Python 3 n'est pas installé sur l'hôte géré",
            solution: "sudo apt install -y python3 sur chaque hôte. Ou ajouter ansible_python_interpreter=/usr/bin/python3 dans l'inventaire."
          }
        ]
      },
      {
        titre: "Étape 3 — Premier playbook : installer et configurer Nginx",
        contexte: "Un playbook est un fichier YAML qui décrit les tâches à exécuter sur les hôtes. On crée un playbook pour installer Nginx, déployer une page HTML et s'assurer que le service est démarré.",
        commandes: [
          { os: "linux", cmd: "# Créer playbook-nginx.yml :\n---\n- name: Installer et configurer Nginx\n  hosts: webservers\n  become: yes\n\n  vars:\n    site_name: \"Mon site Ansible\"\n    nginx_port: 80\n\n  tasks:\n    - name: Mettre à jour le cache apt\n      apt:\n        update_cache: yes\n        cache_valid_time: 3600\n\n    - name: Installer Nginx\n      apt:\n        name: nginx\n        state: present\n\n    - name: Déployer la page index.html\n      copy:\n        content: \"<h1>{{ site_name }} — {{ inventory_hostname }}</h1>\"\n        dest: /var/www/html/index.html\n        owner: www-data\n        group: www-data\n        mode: \'0644\'\n      notify: Redémarrer Nginx\n\n    - name: S'assurer que Nginx est démarré et activé\n      service:\n        name: nginx\n        state: started\n        enabled: yes\n\n  handlers:\n    - name: Redémarrer Nginx\n      service:\n        name: nginx\n        state: restarted", commentaire: "Playbook complet avec variables, copy, service et handler" },
          { os: "linux", cmd: "# Vérifier la syntaxe sans exécuter :\nansible-playbook playbook-nginx.yml --syntax-check", commentaire: "Vérification syntaxe YAML" },
          { os: "linux", cmd: "# Simulation (dry run) :\nansible-playbook playbook-nginx.yml --check", commentaire: "Voir ce qui serait changé sans l'appliquer" },
          { os: "linux", cmd: "# Exécuter le playbook :\nansible-playbook playbook-nginx.yml -v", commentaire: "Déployer Nginx sur tous les webservers" },
          { os: "linux", cmd: "# Vérifier le résultat :\ncurl http://192.168.1.21\ncurl http://192.168.1.22", commentaire: "La page doit afficher le hostname de chaque serveur" }
        ],
        erreurs_courantes: [
          {
            symptome: "FAILED — Missing sudo password",
            cause: "become: yes nécessite sudo sans mot de passe ou le mot de passe doit être fourni",
            solution: "Configurer sudo sans mot de passe sur les hôtes : echo 'user ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/ansible. Ou ajouter --ask-become-pass à la commande."
          }
        ]
      },
      {
        titre: "Étape 4 — Variables, templates Jinja2 et roles",
        contexte: "On améliore le playbook avec des templates Jinja2 pour générer des fichiers de configuration dynamiques, et on découvre la structure des roles Ansible pour organiser le code.",
        commandes: [
          { os: "linux", cmd: "# Créer un template Jinja2 pour nginx.conf :\nmkdir templates\n\n# templates/nginx.conf.j2 :\nserver {\n    listen {{ nginx_port }};\n    server_name {{ ansible_hostname }};\n    root /var/www/html;\n    index index.html;\n\n    access_log /var/log/nginx/{{ ansible_hostname }}-access.log;\n    error_log  /var/log/nginx/{{ ansible_hostname }}-error.log;\n}", commentaire: "Template Jinja2 : variables Ansible injectées au déploiement" },
          { os: "linux", cmd: "# Ajouter une tâche template dans le playbook :\n    - name: Déployer la configuration Nginx\n      template:\n        src: templates/nginx.conf.j2\n        dest: /etc/nginx/sites-available/default\n        owner: root\n        group: root\n        mode: \'0644\'\n      notify: Redémarrer Nginx", commentaire: "Module template : génère le fichier depuis le .j2" },
          { os: "linux", cmd: "# Créer la structure d'un role :\nansible-galaxy init roles/nginx\ntree roles/nginx/", commentaire: "Structure standard : tasks, handlers, templates, vars, defaults, files" },
          { os: "linux", cmd: "ansible-playbook playbook-nginx.yml -v\nansible webservers -m command -a \"nginx -t\"", commentaire: "Appliquer et vérifier la config Nginx sur les hôtes" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "ansible all -m ping : tous les hôtes répondent pong",
      "Inventaire inventory.yml avec groupes webservers et dbservers",
      "ansible-playbook playbook-nginx.yml --syntax-check : aucune erreur",
      "Nginx installé sur web01 et web02 via le playbook",
      "curl http://192.168.1.21 : page affiche le hostname du serveur",
      "Handler Redémarrer Nginx déclenché uniquement si index.html modifié",
      "Template nginx.conf.j2 déployé avec les variables Ansible"
    ],
    tags: ["ansible", "playbook", "inventaire", "nginx", "automation", "iac", "jinja2", "ssh"],
    date_ajout: "2026-04-10",
    source: "Personnel"
  },

  /* ── TP 20 — Automatisation : Bash scripting ── */
  {
    id: 20,
    titre: "Bash scripting — automatisation des tâches admin Linux",
    categorie: "automatisation",
    niveau: "débutant",
    duree: 75,
    description: "Apprendre les bases du scripting Bash pour automatiser les tâches d'administration système : sauvegardes automatiques, monitoring de services, rapports système, et gestion des logs. On couvre les structures de contrôle, les fonctions, les expressions régulières et la planification avec cron.",
    objectifs: [
      "Maîtriser les variables, conditions, boucles et fonctions Bash",
      "Créer un script de sauvegarde automatique avec rotation",
      "Écrire un script de monitoring de services avec alertes",
      "Utiliser sed, awk et grep pour traiter les logs",
      "Planifier l'exécution automatique avec crontab"
    ],
    prerequis: [
      { type: "vm", nom: "VM Debian 12 ou Ubuntu 22.04" },
      { type: "reseau", nom: "Notions de base Linux (fichiers, permissions, redirections)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Bases du scripting Bash",
        contexte: "Un script Bash commence par le shebang #!/bin/bash qui indique l'interpréteur. On couvre les bases : variables, paramètres, conditions et boucles que tout script admin utilise.",
        commandes: [
          { os: "linux", cmd: "#!/bin/bash\n# Structure de base d'un script\n\n# Variables\nNOM=\"Serveur-01\"\nDATE=$(date +%Y-%m-%d)\nUSER=$(whoami)\n\n# Paramètres positionnels\necho \"Script : $0\"\necho \"Paramètre 1 : $1\"\necho \"Tous les params : $@\"\n\n# Variables spéciales\necho \"PID du script : $$\"\necho \"Code retour dernier cmd : $?\"", commentaire: "Variables, paramètres et variables spéciales" },
          { os: "linux", cmd: "# Conditions :\nif [ -f /etc/passwd ]; then\n    echo \"Fichier existe\"\nelif [ -d /tmp ]; then\n    echo \"C'est un répertoire\"\nelse\n    echo \"N'existe pas\"\nfi\n\n# Comparaisons numériques :\n# -eq -ne -lt -le -gt -ge\n# Comparaisons chaînes : == != -z (vide) -n (non vide)\n# Fichiers : -f (fichier) -d (dir) -r (lisible) -w (écriture) -x (exécutable)", commentaire: "Structures conditionnelles et opérateurs de test" },
          { os: "linux", cmd: "# Boucles :\nfor i in 1 2 3 4 5; do\n    echo \"Itération $i\"\ndone\n\nfor fichier in /etc/*.conf; do\n    echo \"Config : $fichier\"\ndone\n\n# While :\ncompteur=0\nwhile [ $compteur -lt 5 ]; do\n    echo \"Compteur : $compteur\"\n    ((compteur++))\ndone", commentaire: "Boucles for et while" },
          { os: "linux", cmd: "# Fonctions :\nlog() {\n    local niveau=$1\n    local message=$2\n    echo \"[$(date +%H:%M:%S)] [$niveau] $message\" | tee -a /var/log/mon-script.log\n}\n\nlog \"INFO\" \"Démarrage du script\"\nlog \"ERROR\" \"Erreur détectée\"", commentaire: "Fonctions avec variables locales et logging" }
        ],
        erreurs_courantes: [
          {
            symptome: "Permission denied lors de l'exécution du script",
            cause: "Le script n'est pas exécutable",
            solution: "chmod +x mon-script.sh — puis ./mon-script.sh ou bash mon-script.sh"
          }
        ]
      },
      {
        titre: "Étape 2 — Script de sauvegarde automatique",
        contexte: "On crée un script de sauvegarde complet avec : rotation des anciennes sauvegardes, compression, logging et vérification des erreurs. C'est un script qu'on utilise réellement en production.",
        commandes: [
          { os: "linux", cmd: "#!/bin/bash\n# backup.sh — Sauvegarde automatique avec rotation\n\nset -euo pipefail  # Arrêt sur erreur, variables non définies interdites\n\n# Configuration\nSOURCE=\"/etc /home/user/documents\"\nDEST=\"/backup\"\nRETENTION=7  # Garder 7 jours\nDATE=$(date +%Y-%m-%d_%H-%M)\nLOG=\"/var/log/backup.log\"\n\n# Fonction de logging\nlog() { echo \"[$(date '+%Y-%m-%d %H:%M:%S')] $*\" | tee -a \"$LOG\"; }\n\n# Vérifications\n[ ! -d \"$DEST\" ] && mkdir -p \"$DEST\"\ndf -h \"$DEST\" | awk \'NR==2{if($5+0>90) exit 1}\' || { log \"ERREUR: Disque backup >90%\"; exit 1; }\n\n# Sauvegarde\nlog \"INFO: Début sauvegarde $DATE\"\ntar -czf \"\"$DEST\"/backup_$DATE.tar.gz\" $SOURCE 2>>\"\"$LOG\"\"\ && log \"OK: Sauvegarde créée\" || { log \"ERREUR: Échec tar\"; exit 1; }\n\n# Rotation — supprimer les fichiers de plus de $RETENTION jours\nfind \"$DEST\" -name \"backup_*.tar.gz\" -mtime +$RETENTION -delete\nlog \"INFO: Rotation effectuée (>$RETENTION jours supprimés)\"\n\n# Rapport\nNB=$(ls \"$DEST\"/backup_*.tar.gz 2>/dev/null | wc -l)\nTAILLE=$(du -sh \"$DEST\" | cut -f1)\nlog \"INFO: $NB sauvegardes stockées, taille totale $TAILLE\"", commentaire: "Script de backup production-ready avec rotation et logging" },
          { os: "linux", cmd: "chmod +x backup.sh\nsudo ./backup.sh\ncat /var/log/backup.log", commentaire: "Exécuter et vérifier les logs" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Script de monitoring de services",
        contexte: "On crée un script qui vérifie l'état de plusieurs services et envoie une alerte (log + mail optionnel) si l'un d'eux est arrêté, avec tentative de redémarrage automatique.",
        commandes: [
          { os: "linux", cmd: "#!/bin/bash\n# monitor-services.sh\n\nSERVICES=(\"nginx\" \"ssh\" \"cron\")\nLOG=\"/var/log/monitor.log\"\nALERTES=0\n\nlog() { echo \"[$(date '+%Y-%m-%d %H:%M:%S')] $*\" | tee -a \"$LOG\"; }\n\nfor service in \"${SERVICES[@]}\"; do\n    if systemctl is-active --quiet \"$service\"; then\n        log \"OK: $service est actif\"\n    else\n        log \"ALERTE: $service est ARRÊTÉ — tentative de redémarrage\"\n        systemctl restart \"$service\" && log \"OK: $service redémarré\" || log \"ERREUR: Impossible de redémarrer $service\"\n        ((ALERTES++))\n    fi\ndone\n\n# Vérifier la charge CPU\nCPU=$(top -bn1 | grep \"Cpu(s)\" | awk \'{print $2}\' | cut -d. -f1)\n[ \"$CPU\" -gt 80 ] && log \"ALERTE: CPU élevé — ${CPU}%\"\n\n# Vérifier l'espace disque\ndf -h / | awk \'NR==2{\n    used=$5+0\n    if(used>85) print \"[ALERTE] Disque / à \" used \"% — action requise\"\n}\' | tee -a \"$LOG\"\n\nlog \"INFO: Monitoring terminé — $ALERTES alerte(s)\"\nexit $ALERTES", commentaire: "Monitoring services, CPU et disque avec redémarrage automatique" },
          { os: "linux", cmd: "chmod +x monitor-services.sh\nsudo ./monitor-services.sh\necho \"Code retour : $?\"", commentaire: "Exécuter — code retour = nombre d'alertes" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Traitement de logs avec sed/awk/grep et crontab",
        contexte: "On utilise sed, awk et grep pour extraire des informations des logs système. Puis on planifie les scripts avec crontab pour une exécution automatique.",
        commandes: [
          { os: "linux", cmd: "# Extraire les erreurs SSH des logs :\ngrep \"Failed password\" /var/log/auth.log | tail -20", commentaire: "Tentatives de connexion SSH échouées" },
          { os: "linux", cmd: "# Top 10 IPs qui tentent de se connecter :\ngrep \"Failed password\" /var/log/auth.log | awk \'{print $(NF-3)}\' | sort | uniq -c | sort -rn | head -10", commentaire: "IPs les plus actives dans les attaques brute-force" },
          { os: "linux", cmd: "# Extraire les codes erreur HTTP depuis les logs Nginx :\nawk \'{print $9}\' /var/log/nginx/access.log | sort | uniq -c | sort -rn", commentaire: "Comptage des codes HTTP (200, 404, 500...)" },
          { os: "linux", cmd: "# sed — remplacer dans un fichier :\nsed -i \"s/127.0.0.1/0.0.0.0/g\" /etc/mon-service.conf", commentaire: "Remplacer une valeur dans un fichier de config" },
          { os: "linux", cmd: "# Planifier avec crontab :\ncrontab -e\n\n# Format : minute heure jour mois jour_semaine commande\n# Backup tous les jours à 2h du matin :\n0 2 * * * /opt/scripts/backup.sh >> /var/log/backup-cron.log 2>&1\n\n# Monitoring toutes les 5 minutes :\n*/5 * * * * /opt/scripts/monitor-services.sh >> /var/log/monitor-cron.log 2>&1\n\n# Rapport hebdomadaire le lundi à 8h :\n0 8 * * 1 /opt/scripts/rapport-semaine.sh", commentaire: "Planification cron : backup quotidien + monitoring 5min" },
          { os: "linux", cmd: "crontab -l\nsudo systemctl status cron", commentaire: "Vérifier les tâches planifiées et l'état du service cron" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le script fonctionne manuellement mais pas via cron",
            cause: "Cron a un environnement minimal — PATH différent, pas de variables d'environnement",
            solution: "Toujours utiliser des chemins absolus dans les scripts cron (/usr/bin/python3 pas python3). Ajouter PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin en début de script."
          }
        ]
      }
    ],
    checklist: [
      "backup.sh : crée une archive tar.gz dans /backup avec la date",
      "backup.sh : rotation fonctionnelle (fichiers >7 jours supprimés)",
      "monitor-services.sh : détecte un service arrêté et tente le redémarrage",
      "grep + awk : top 10 IPs brute-force SSH extraites de auth.log",
      "crontab : backup planifié à 2h et monitoring toutes les 5 minutes",
      "crontab -l : tâches visibles et actives"
    ],
    tags: ["bash", "scripting", "cron", "backup", "monitoring", "awk", "sed", "grep", "automatisation"],
    date_ajout: "2026-04-15",
    source: "Personnel"
  }

,

  /* ── TP 21 — Sauvegardes : rsync + sauvegarde incrémentale ── */
  {
    id: 21,
    titre: "Sauvegardes avec rsync — locale, distante et incrémentale",
    categorie: "sauvegardes",
    niveau: "débutant",
    duree: 60,
    description: "Maîtriser rsync pour les sauvegardes locales et distantes sur Linux. On configure des sauvegardes complètes, incrémentielles avec hardlinks (technique du backup miroir), et on automatise le tout avec cron. rsync est l'outil de référence pour les sauvegardes légères sans agent.",
    objectifs: [
      "Comprendre les options essentielles de rsync (-avz, --delete, --exclude)",
      "Effectuer une sauvegarde locale et une sauvegarde distante via SSH",
      "Implémenter les sauvegardes incrémentielles avec --link-dest (hardlinks)",
      "Exclure les fichiers inutiles (cache, tmp, logs)",
      "Automatiser et planifier les sauvegardes avec cron"
    ],
    prerequis: [
      { type: "vm", nom: "1x VM Debian/Ubuntu (source)" },
      { type: "vm", nom: "1x VM Debian/Ubuntu (destination distante)" },
      { type: "reseau", nom: "SSH fonctionnel entre les deux VMs" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Bases de rsync et première sauvegarde locale",
        contexte: "rsync synchronise des fichiers localement ou via SSH. Il ne transfère que les différences (delta), ce qui le rend très efficace. L'option -a préserve les permissions, timestamps, liens symboliques et groupes.",
        commandes: [
          { os: "linux", cmd: "sudo apt install -y rsync", commentaire: "rsync est souvent déjà installé sur Debian/Ubuntu" },
          { os: "linux", cmd: "# Sauvegarde locale basique :\nrsync -av /home/user/documents/ /backup/documents/", commentaire: "-a = archive (preserve tout), -v = verbose. Le / final sur source est important !" },
          { os: "linux", cmd: "# Avec progression et compression :\nrsync -avz --progress /home/user/documents/ /backup/documents/", commentaire: "-z = compression pendant transfert, --progress = afficher la progression" },
          { os: "linux", cmd: "# Synchronisation miroir — supprimer les fichiers supprimés à la source :\nrsync -av --delete /home/user/documents/ /backup/documents/", commentaire: "--delete : les fichiers supprimés à la source sont supprimés à la destination" },
          { os: "linux", cmd: "# Exclure des répertoires inutiles :\nrsync -av --exclude='.cache/' --exclude='*.tmp' --exclude='__pycache__/' /home/user/ /backup/home/", commentaire: "Exclure cache, fichiers temp et cache Python" },
          { os: "linux", cmd: "# Dry run — simuler sans modifier :\nrsync -av --dry-run --delete /home/user/ /backup/home/", commentaire: "--dry-run : voir ce qui serait fait sans l'exécuter" }
        ],
        erreurs_courantes: [
          {
            symptome: "rsync copie le répertoire source au lieu de son contenu",
            cause: "Oubli du / final sur le chemin source",
            solution: "/source/dir/ (avec /) copie le contenu. /source/dir (sans /) copie le répertoire lui-même dans la destination."
          }
        ]
      },
      {
        titre: "Étape 2 — Sauvegarde distante via SSH",
        contexte: "rsync utilise SSH comme transport pour les sauvegardes distantes. La syntaxe est user@host:chemin pour la destination. On configure l'authentification par clé pour automatiser sans mot de passe.",
        commandes: [
          { os: "linux", cmd: "# Sauvegarde vers un serveur distant :\nrsync -avz -e ssh /home/user/documents/ user@192.168.1.100:/backup/documents/", commentaire: "-e ssh : utiliser SSH comme transport" },
          { os: "linux", cmd: "# Avec clé SSH spécifique et port non standard :\nrsync -avz -e \"ssh -i ~/.ssh/backup_key -p 2222\" /home/user/ user@192.168.1.100:/backup/home/", commentaire: "Spécifier clé SSH et port dans l'option -e" },
          { os: "linux", cmd: "# Depuis le serveur distant vers local (pull) :\nrsync -avz user@192.168.1.100:/var/www/html/ /backup/web/", commentaire: "Pull : récupérer depuis un serveur distant vers local" },
          { os: "linux", cmd: "rsync -avz --stats /home/user/ user@192.168.1.100:/backup/home/", commentaire: "--stats : afficher les statistiques de transfert (fichiers, octets, vitesse)" }
        ],
        erreurs_courantes: [
          {
            symptome: "rsync demande un mot de passe à chaque exécution",
            cause: "Authentification par clé SSH non configurée",
            solution: "ssh-keygen -t ed25519 puis ssh-copy-id user@192.168.1.100. Tester : ssh user@192.168.1.100 — doit se connecter sans mot de passe."
          }
        ]
      },
      {
        titre: "Étape 3 — Sauvegardes incrémentielles avec --link-dest",
        contexte: "La technique du backup miroir avec --link-dest crée des hardlinks vers les fichiers inchangés de la sauvegarde précédente. Résultat : chaque snapshot semble complet mais ne consomme de l'espace que pour les fichiers modifiés. C'est la technique utilisée par Time Machine d'Apple.",
        commandes: [
          { os: "linux", cmd: "# Structure des snapshots :\n# /backup/\n#   2026-04-01/  (sauvegarde complète)\n#   2026-04-02/  (incremental — hardlinks vers 2026-04-01)\n#   2026-04-03/  (incremental — hardlinks vers 2026-04-02)\nDEST=/backup\nDATE=$(date +%Y-%m-%d)\nDERNIER=$(ls -1d $DEST/20* 2>/dev/null | tail -1)", commentaire: "Variables pour la gestion des snapshots datés" },
          { os: "linux", cmd: "# Première sauvegarde (complète) :\nrsync -av /home/user/ $DEST/$DATE/", commentaire: "Snapshot initial complet" },
          { os: "linux", cmd: "# Sauvegardes suivantes (incrémentielles) :\nrsync -av --link-dest=$DEST/$DERNIER /home/user/ $DEST/$DATE/", commentaire: "--link-dest : hardlinks vers le snapshot précédent pour les fichiers inchangés" },
          { os: "linux", cmd: "# Vérifier l'espace utilisé :\ndu -sh /backup/20*/\ndu -sh /backup/", commentaire: "Chaque snapshot semble complet mais partage les fichiers inchangés" },
          { os: "linux", cmd: "# Script complet de backup incrémentiel :\n#!/bin/bash\nSOURCE=\"/home/user\"\nDEST=\"/backup\"\nDATE=$(date +%Y-%m-%d_%H-%M)\nDERNIER=$(ls -1d $DEST/20* 2>/dev/null | tail -1)\n\nif [ -z \"$DERNIER\" ]; then\n    rsync -av \"$SOURCE/\" \"$DEST/$DATE/\"\nelse\n    rsync -av --link-dest=\"$DERNIER\" \"$SOURCE/\" \"$DEST/$DATE/\"\nfi\n\necho \"Snapshot créé : $DEST/$DATE\"\nfind \"$DEST\" -maxdepth 1 -type d -name \"20*\" | sort | head -n -30 | xargs rm -rf", commentaire: "Script complet : premier backup complet, suivants incrémentiels, conservation 30 snapshots" }
        ],
        erreurs_courantes: [
          {
            symptome: "Les hardlinks ne fonctionnent pas entre deux systèmes de fichiers différents",
            cause: "--link-dest et la destination doivent être sur le même système de fichiers",
            solution: "Source et destination des snapshots doivent être sur la même partition. Pour des backups distants, le --link-dest doit pointer vers un chemin sur la machine distante."
          }
        ]
      },
      {
        titre: "Étape 4 — Automatisation et monitoring des sauvegardes",
        contexte: "On planifie les sauvegardes avec cron et on ajoute un mécanisme de vérification pour s'assurer qu'elles se déroulent correctement. Un backup non vérifié est un backup dont on ne peut pas garantir la fiabilité.",
        commandes: [
          { os: "linux", cmd: "sudo nano /opt/scripts/backup-rsync.sh\nsudo chmod +x /opt/scripts/backup-rsync.sh", commentaire: "Créer le script de backup dans /opt/scripts/" },
          { os: "linux", cmd: "# Planifier dans crontab :\ncrontab -e\n# Sauvegarde quotidienne à 3h :\n0 3 * * * /opt/scripts/backup-rsync.sh >> /var/log/backup-rsync.log 2>&1\n# Sauvegarde hebdomadaire complète le dimanche à 2h :\n0 2 * * 0 rsync -av --delete /home/ user@192.168.1.100:/backup/weekly/ >> /var/log/backup-weekly.log 2>&1", commentaire: "Backup quotidien incrémentiel + hebdomadaire complet" },
          { os: "linux", cmd: "# Vérifier les dernières sauvegardes :\nls -la /backup/ | tail -10\ndu -sh /backup/*/", commentaire: "Lister et tailles des snapshots" },
          { os: "linux", cmd: "# Tester la restauration :\nrsync -av /backup/2026-04-01/documents/ /tmp/restore-test/\ndiff -r /home/user/documents/ /tmp/restore-test/", commentaire: "Toujours tester la restauration ! Un backup non testé n'est pas fiable" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "rsync -av /home/user/ /backup/home/ : sauvegarde locale fonctionnelle",
      "rsync via SSH vers 192.168.1.100 : transfert sans mot de passe",
      "Premier snapshot complet créé dans /backup/DATE/",
      "Snapshot incrémentiel avec --link-dest : espace disque minimal utilisé",
      "du -sh /backup/*/ : chaque snapshot semblable en taille mais partage les hardlinks",
      "crontab -l : backup planifié à 3h",
      "Test de restauration depuis snapshot : diff confirme intégrité"
    ],
    tags: ["rsync", "backup", "sauvegarde", "incremental", "hardlink", "ssh", "cron", "linux"],
    date_ajout: "2026-04-20",
    source: "École"
  },

  /* ── TP 22 — Sauvegardes : BorgBackup — déduplication et chiffrement ── */
  {
    id: 22,
    titre: "BorgBackup — sauvegardes dédupliquées et chiffrées",
    categorie: "sauvegardes",
    niveau: "intermédiaire",
    duree: 75,
    description: "Utiliser BorgBackup pour des sauvegardes avancées avec déduplication (économie d'espace), compression et chiffrement AES-256. BorgBackup est idéal pour les environnements où l'espace disque est précieux et la confidentialité essentielle.",
    objectifs: [
      "Installer et initialiser un dépôt BorgBackup local et distant",
      "Créer des archives chiffrées avec compression",
      "Comprendre et exploiter la déduplication de Borg",
      "Lister, monter et restaurer des archives",
      "Automatiser les sauvegardes et la rotation avec Borgmatic"
    ],
    prerequis: [
      { type: "vm", nom: "VM Debian 12 ou Ubuntu 22.04 (source)" },
      { type: "vm", nom: "VM Debian 12 (serveur de backup distant — optionnel)" },
      { type: "reseau", nom: "SSH fonctionnel entre les VMs" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer BorgBackup et initialiser un dépôt",
        contexte: "BorgBackup stocke les sauvegardes dans un dépôt (repository). Le dépôt peut être local ou distant via SSH. On initialise le dépôt une seule fois avec un mode de chiffrement.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install -y borgbackup", commentaire: "Installer BorgBackup depuis les dépôts Debian" },
          { os: "linux", cmd: "borg --version", commentaire: "Vérifier la version installée" },
          { os: "linux", cmd: "# Initialiser un dépôt LOCAL chiffré :\nborg init --encryption=repokey /backup/borg-repo", commentaire: "repokey : clé stockée dans le dépôt, protégée par passphrase" },
          { os: "linux", cmd: "# Modes de chiffrement disponibles :\n# none        : pas de chiffrement (déconseillé)\n# repokey     : clé dans le dépôt (+ passphrase)\n# keyfile     : clé dans ~/.config/borg/ (+ passphrase)\n# repokey-blake2 : plus rapide sur CPU modernes (recommandé)", commentaire: "Choisir repokey-blake2 pour les nouvelles installations" },
          { os: "linux", cmd: "# Initialiser un dépôt DISTANT via SSH :\nborg init --encryption=repokey-blake2 user@192.168.1.100:/backup/borg-remote", commentaire: "Dépôt distant — BorgBackup doit être installé sur le serveur distant aussi" },
          { os: "linux", cmd: "# Exporter et sauvegarder la clé du dépôt :\nborg key export /backup/borg-repo /tmp/borg-key-backup.txt\ncat /tmp/borg-key-backup.txt", commentaire: "CRITIQUE : sauvegarder la clé séparément — sans elle les backups sont irrécupérables" }
        ],
        erreurs_courantes: [
          {
            symptome: "Failed to create/lock repository — directory not empty",
            cause: "Le répertoire de destination contient déjà des fichiers",
            solution: "Utiliser un répertoire vide ou un nouveau chemin. borg init échoue si le répertoire n'est pas vide."
          }
        ]
      },
      {
        titre: "Étape 2 — Créer des archives et comprendre la déduplication",
        contexte: "BorgBackup découpe les fichiers en chunks et déduplique les blocs identiques entre archives. Résultat : la 2e sauvegarde d'un fichier inchangé n'occupe presque aucun espace supplémentaire.",
        commandes: [
          { os: "linux", cmd: "# Variable d'environnement pour éviter de taper la passphrase :\nexport BORG_PASSPHRASE='MaPassphraseBorg123'", commentaire: "En prod : utiliser un fichier sécurisé ou un agent — jamais en clair dans la config" },
          { os: "linux", cmd: "# Créer une archive (sauvegarde) :\nborg create --stats --progress /backup/borg-repo::backup-{now:%Y-%m-%d_%H-%M} /home/user /etc", commentaire: "::backup-{now} = nom de l'archive avec date auto" },
          { os: "linux", cmd: "# Créer avec compression :\nborg create --compression lz4 --stats /backup/borg-repo::backup-{now:%Y-%m-%d} /home/user", commentaire: "lz4 = rapide / zstd = meilleur ratio / zlib = compatible" },
          { os: "linux", cmd: "# Lister les archives du dépôt :\nborg list /backup/borg-repo", commentaire: "Voir toutes les archives avec date et taille" },
          { os: "linux", cmd: "# Infos sur une archive spécifique :\nborg list /backup/borg-repo::backup-2026-04-20", commentaire: "Lister les fichiers dans une archive" },
          { os: "linux", cmd: "# Statistiques du dépôt (déduplication) :\nborg info /backup/borg-repo", commentaire: "Voir l'espace original vs compressé vs dédupliqué — l'économie est souvent 50-80%" }
        ],
        erreurs_courantes: [
          {
            symptome: "ERROR passphrase provided in BORG_PASSPHRASE is incorrect",
            cause: "La passphrase ne correspond pas à celle utilisée lors de borg init",
            solution: "Vérifier la passphrase. Si perdue et pas de backup de la clé, les données sont irrécupérables. C'est pourquoi borg key export est critique."
          }
        ]
      },
      {
        titre: "Étape 3 — Restaurer depuis une archive Borg",
        contexte: "BorgBackup permet de restaurer tout ou partie d'une archive. On peut aussi monter une archive comme un système de fichiers FUSE pour naviguer et restaurer des fichiers individuels.",
        commandes: [
          { os: "linux", cmd: "# Restaurer une archive complète :\ncd /tmp/restore\nborg extract /backup/borg-repo::backup-2026-04-20", commentaire: "Restaure dans le répertoire courant en recréant l'arborescence" },
          { os: "linux", cmd: "# Restaurer un fichier ou dossier spécifique :\nborg extract /backup/borg-repo::backup-2026-04-20 home/user/documents/important.txt", commentaire: "Restauration sélective — chemin relatif sans / initial" },
          { os: "linux", cmd: "# Monter une archive en FUSE pour naviguer :\nsudo apt install -y borgbackup-fuse\nmkdir /mnt/borg-mount\nborg mount /backup/borg-repo::backup-2026-04-20 /mnt/borg-mount\nls /mnt/borg-mount/", commentaire: "Navigation interactive dans l'archive comme un système de fichiers" },
          { os: "linux", cmd: "# Démonter après consultation :\nborg umount /mnt/borg-mount", commentaire: "Toujours démonter proprement" },
          { os: "linux", cmd: "# Vérifier l'intégrité d'une archive :\nborg check /backup/borg-repo\nborg check --verify-data /backup/borg-repo", commentaire: "Vérifier la cohérence du dépôt et l'intégrité des données" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Rotation des archives avec Borgmatic",
        contexte: "Borgmatic est un wrapper autour de BorgBackup qui simplifie la configuration et automatise la rotation (pruning). Un seul fichier YAML remplace les scripts Bash complexes.",
        commandes: [
          { os: "linux", cmd: "sudo apt install -y borgmatic", commentaire: "Installer Borgmatic" },
          { os: "linux", cmd: "# Créer la configuration :\nsudo mkdir -p /etc/borgmatic\nsudo nano /etc/borgmatic/config.yaml", commentaire: "Fichier de configuration Borgmatic" },
          { os: "linux", cmd: "# Contenu config.yaml :\nlocation:\n    source_directories:\n        - /home/user\n        - /etc\n    repositories:\n        - path: /backup/borg-repo\n          label: local\n\nstorage:\n    encryption_passphrase: \"MaPassphraseBorg123\"\n    compression: lz4\n\nretention:\n    keep_daily: 7\n    keep_weekly: 4\n    keep_monthly: 6\n\nconsistency:\n    checks:\n        - name: repository\n        - name: archives", commentaire: "Config complète : sources, dépôt, passphrase, rétention 7j/4s/6m" },
          { os: "linux", cmd: "borgmatic --verbosity 1", commentaire: "Lancer une sauvegarde avec Borgmatic" },
          { os: "linux", cmd: "borgmatic list\nborgmatic info", commentaire: "Lister les archives et infos du dépôt via Borgmatic" },
          { os: "linux", cmd: "# Planifier avec cron :\ncrontab -e\n# 0 4 * * * borgmatic >> /var/log/borgmatic.log 2>&1", commentaire: "Sauvegarde quotidienne à 4h avec rotation automatique" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "borg init : dépôt local initialisé avec chiffrement repokey",
      "borg key export : clé exportée et sauvegardée séparément",
      "borg create --stats : archive créée, statistiques de déduplication visibles",
      "borg list : archives listées avec dates",
      "borg extract : restauration complète dans /tmp/restore fonctionnelle",
      "borg mount : archive montée en FUSE et navigation possible",
      "borgmatic configuré et planifié avec rotation 7j/4s/6m"
    ],
    tags: ["borg", "borgbackup", "borgmatic", "sauvegarde", "chiffrement", "deduplication", "linux", "backup"],
    date_ajout: "2026-04-25",
    source: "École"
  },

  /* ── TP 23 — Sauvegardes : PRA — Plan de Reprise d'Activité ── */
  {
    id: 23,
    titre: "PRA — Plan de Reprise d'Activité avec snapshots et restauration",
    categorie: "sauvegardes",
    niveau: "avancé",
    duree: 90,
    description: "Mettre en place un Plan de Reprise d'Activité (PRA) complet : snapshots VM Proxmox, réplication vers un site secondaire, procédures de restauration documentées et tests de bascule. On définit les objectifs RTO (Recovery Time Objective) et RPO (Recovery Point Objective) et on les valide par des tests.",
    objectifs: [
      "Comprendre et définir RTO et RPO pour un service donné",
      "Créer et gérer des snapshots VM sous Proxmox",
      "Configurer la réplication Proxmox vers un site secondaire",
      "Documenter et tester les procédures de restauration",
      "Valider le PRA par un exercice de bascule complet"
    ],
    prerequis: [
      { type: "logiciel", nom: "Proxmox VE 8.x (TP 3 recommandé)", lien: "https://proxmox.com" },
      { type: "vm", nom: "Au moins 2 VMs Proxmox pour les tests" },
      { type: "reseau", nom: "Connexion réseau entre nœuds Proxmox (optionnel pour réplication)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Définir RTO, RPO et stratégie de sauvegarde",
        contexte: "Avant toute configuration technique, on définit les objectifs du PRA. Le RPO (Recovery Point Objective) est la perte de données maximale acceptable. Le RTO (Recovery Time Objective) est le délai maximal de reprise. Ces deux métriques dictent la stratégie technique.",
        commandes: [
          { os: "both", cmd: "# Exemple de matrice RTO/RPO pour un lab BTS :\n#\n# Service         | RPO      | RTO      | Stratégie\n# ----------------|----------|----------|-------------------\n# Serveur Web     | 24h      | 2h       | Backup quotidien + snapshot\n# Base de données | 1h       | 30min    | Backup toutes les heures\n# Active Directory| 4h       | 1h       | Réplication + snapshot\n# Fichiers users  | 24h      | 4h       | rsync quotidien\n#\n# RPO court = backups fréquents = plus de stockage\n# RTO court = restauration rapide = infrastructure redondante", commentaire: "Matrice RTO/RPO — adapter selon les services supervisés" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Snapshots VM Proxmox et planification",
        contexte: "Proxmox permet des snapshots instantanés des VMs (avec ou sans état RAM). On configure des snapshots automatiques via l'éducation/cron Proxmox et on gère leur rétention.",
        commandes: [
          { os: "linux", cmd: "# Snapshot manuel via CLI Proxmox :\nqm snapshot 100 \"pre-update-$(date +%Y%m%d)\" --description \"Avant mise à jour système\"\nqm listsnapshot 100", commentaire: "Snapshot de la VM 100 avec nom daté" },
          { os: "linux", cmd: "# Script de snapshot automatique avec rotation :\n#!/bin/bash\nVMID=100\nNOM=\"auto-$(date +%Y-%m-%d_%H)\"\nRETENTION=5\n\n# Créer le snapshot\nqm snapshot $VMID \"$NOM\" --description \"Snapshot automatique $NOM\"\n\n# Lister et supprimer les anciens\nSNAPS=$(qm listsnapshot $VMID | grep \"auto-\" | awk \'{print $2}\' | head -n -$RETENTION)\nfor snap in $SNAPS; do\n    qm delsnapshot $VMID \"$snap\"\n    echo \"Supprimé : $snap\"\ndone", commentaire: "Script rotation : garde les 5 derniers snapshots auto" },
          { os: "linux", cmd: "# Planifier via crontab sur le nœud Proxmox :\ncrontab -e\n# Snapshot toutes les 6h :\n0 */6 * * * /opt/scripts/snapshot-vm.sh >> /var/log/snapshots.log 2>&1", commentaire: "Snapshot automatique toutes les 6h — RPO = 6h" },
          { os: "linux", cmd: "# Restaurer un snapshot :\nqm stop 100\nqm rollback 100 \"pre-update-20260420\"\nqm start 100", commentaire: "Rollback vers un snapshot — la VM doit être arrêtée" }
        ],
        erreurs_courantes: [
          {
            symptome: "qm snapshot échoue — storage does not support snapshots",
            cause: "Le stockage utilisé par la VM ne supporte pas les snapshots",
            solution: "Migrer le disque vers LVM-thin ou ZFS. Dans Proxmox : VM → Hardware → Hard Disk → Move Disk vers local-lvm."
          }
        ]
      },
      {
        titre: "Étape 3 — Réplication Proxmox vers site secondaire",
        contexte: "La réplication Proxmox synchronise les disques d'une VM vers un nœud secondaire à intervalles réguliers. En cas de panne du nœud primaire, on peut démarrer la VM sur le secondaire avec un minimum de perte de données.",
        commandes: [
          { os: "linux", cmd: "# Prérequis : les deux nœuds Proxmox doivent être dans le même cluster\n# OU avoir la même configuration de stockage\n\n# Configurer la réplication via l'interface web :\n# VM 100 → Replication → Add\n# Target node : pve-node2\n# Schedule : */15 (toutes les 15 minutes)\n# Rate limit : 50 MB/s (pour ne pas saturer le réseau)", commentaire: "Interface web Proxmox : VM → Replication → Add" },
          { os: "linux", cmd: "# Via CLI pvesr :\npvesr create-local-job 100-0 --target pve-node2 --schedule \"*/15\" --rate 50", commentaire: "Créer une tâche de réplication toutes les 15 minutes" },
          { os: "linux", cmd: "pvesr list\npvesr status", commentaire: "Lister et vérifier l'état des tâches de réplication" },
          { os: "linux", cmd: "pvesr run 100-0", commentaire: "Forcer une réplication immédiate" }
        ],
        erreurs_courantes: [
          {
            symptome: "Réplication échoue — node not reachable",
            cause: "Les nœuds ne sont pas dans le même cluster Proxmox ou SSH entre nœuds non configuré",
            solution: "La réplication Proxmox nécessite un cluster. Pour un lab mono-nœud, utiliser à la place vzdump + rsync vers un NAS ou une VM dédiée backup."
          }
        ]
      },
      {
        titre: "Étape 4 — Sauvegardes vzdump et procédure de restauration",
        contexte: "vzdump est l'outil natif Proxmox pour sauvegarder des VMs/conteneurs LXC en fichiers .vma compressés. On configure les sauvegardes automatiques et on documente et teste la procédure de restauration complète.",
        commandes: [
          { os: "linux", cmd: "# Sauvegarde manuelle d'une VM avec vzdump :\nvzdump 100 --storage local --compress gzip --mode snapshot", commentaire: "Backup VM 100 en mode snapshot (VM reste démarrée)" },
          { os: "linux", cmd: "# Modes vzdump :\n# snapshot : VM reste up, cohérence via snapshot (recommandé)\n# suspend  : VM suspendue pendant le backup\n# stop     : VM arrêtée pendant le backup (plus cohérent, RPO = durée backup)\nvzdump 100 --storage local --compress lzo --mode snapshot --notes \"Backup PRA $(date)\"", commentaire: "Backup avec compression LZO (plus rapide que gzip)" },
          { os: "linux", cmd: "# Planifier via l'interface web Proxmox :\n# Datacenter → Backup → Add\n# Schedule : 02:00 (2h du matin)\n# Storage : local\n# Mode : Snapshot\n# Compression : LZO\n# Retention : Keep Last 7", commentaire: "Backup automatique via l'interface Proxmox" },
          { os: "linux", cmd: "# Restaurer une VM depuis un backup vzdump :\n# Interface web : Storage → local → Backups → Sélectionner le .vma → Restore\n# Ou CLI :\nqmrestore /var/lib/vz/dump/vzdump-qemu-100-2026_04_20-02_00_00.vma.gz 101 --storage local-lvm", commentaire: "Restaurer la VM avec un nouvel ID (101) pour ne pas écraser l'existant" },
          { os: "linux", cmd: "# Documentation de la procédure PRA :\ncat > /opt/pra/procedure-restauration.md << \'EOF\'\n# Procédure de Restauration PRA\n## RTO cible : 2h | RPO cible : 24h\n\n## Étapes :\n1. Identifier le dernier backup valide dans Proxmox → Storage → Backups\n2. Vérifier la date et l'intégrité du backup\n3. Restaurer la VM : qmrestore /chemin/backup.vma VMID --storage local-lvm\n4. Démarrer la VM : qm start VMID\n5. Vérifier les services : systemctl status nginx mysql ssh\n6. Valider l'accès applicatif et notifier les utilisateurs\n7. Documenter la panne et la restauration dans le registre incidents\nEOF", commentaire: "Documentation procédure PRA — essentielle pour le BTS E4/E5" }
        ],
        erreurs_courantes: [
          {
            symptome: "vzdump échoue en mode snapshot — snapshot support not available",
            cause: "Le type de stockage ne supporte pas les snapshots",
            solution: "Utiliser --mode suspend ou --mode stop. Ou migrer les disques vers LVM-thin qui supporte les snapshots."
          }
        ]
      },
      {
        titre: "Étape 5 — Test de bascule et validation du PRA",
        contexte: "Un PRA non testé n'est pas un PRA. On effectue un exercice complet de bascule : simulation de panne, restauration, vérification des services et mesure du RTO réel. On compare avec l'objectif défini.",
        commandes: [
          { os: "linux", cmd: "# Exercice PRA — simuler une panne et mesurer le RTO :\nTIME_DEBUT=$(date +%s)\necho \"Début exercice PRA : $(date)\"\n\n# 1. Arrêter la VM production (simulation panne)\nqm stop 100\n\n# 2. Restaurer depuis le dernier backup\nqmrestore /var/lib/vz/dump/vzdump-qemu-100-*.vma.gz 101 --storage local-lvm --force\n\n# 3. Démarrer la VM restaurée\nqm start 101\nsleep 30\n\n# 4. Vérifier les services\nssh user@IP-VM-101 \"systemctl is-active nginx mysql ssh\"\n\nTIME_FIN=$(date +%s)\nRTO_REEL=$((TIME_FIN - TIME_DEBUT))\necho \"RTO réel : ${RTO_REEL}s ($(($RTO_REEL/60)) minutes)\"", commentaire: "Mesurer le RTO réel — comparer avec l'objectif défini" },
          { os: "linux", cmd: "# Rapport de test PRA :\necho \"=== RAPPORT TEST PRA $(date) ===\nRPO cible : 24h\nDernière sauvegarde : $(ls -lt /var/lib/vz/dump/*.vma.gz | head -1)\nRTO cible : 2h\nRTO mesuré : XX minutes\nServices restaurés : nginx OK, mysql OK, ssh OK\nStatut : SUCCÈS / ÉCHEC\" > /opt/pra/rapport-test-$(date +%Y%m%d).txt", commentaire: "Documenter le résultat du test pour le dossier BTS" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Matrice RTO/RPO définie pour les services du lab",
      "Snapshot manuel VM 100 créé et listé avec qm listsnapshot",
      "Script de snapshot automatique avec rotation des 5 derniers",
      "vzdump configuré en mode snapshot, backup .vma créé dans le storage local",
      "Restauration testée : qmrestore vers VM 101, services vérifiés",
      "RTO mesuré et comparé à l'objectif défini",
      "Procédure de restauration documentée dans /opt/pra/"
    ],
    tags: ["pra", "pca", "rto", "rpo", "proxmox", "snapshot", "vzdump", "restauration", "sauvegarde"],
    date_ajout: "2026-04-30",
    source: "École"
  }

,

  /* ── TP 24 — Projets : Infrastructure réseau complète GNS3 ── */
  {
    id: 24,
    titre: "Projet — Infrastructure réseau complète sous GNS3",
    categorie: "projets",
    niveau: "avancé",
    duree: 180,
    description: "Concevoir et déployer une infrastructure réseau d'entreprise complète dans GNS3 : routage OSPF multi-zone, segmentation VLAN, pare-feu, DMZ, accès distant VPN et supervision. Ce projet de synthèse mobilise toutes les compétences réseau acquises et constitue un livrable de qualité pour le dossier BTS E4/E5.",
    objectifs: [
      "Concevoir un plan d'adressage cohérent pour une infrastructure multi-sites",
      "Déployer OSPF multi-zone avec redistribution de routes",
      "Mettre en place une DMZ avec filtrage ACL",
      "Configurer un accès VPN site-to-site simulé",
      "Documenter l'infrastructure avec schéma réseau et tableau d'adressage"
    ],
    prerequis: [
      { type: "logiciel", nom: "GNS3 2.2+ avec GNS3 VM", lien: "https://gns3.com" },
      { type: "vm", nom: "3x Cisco IOSv (routeurs)" },
      { type: "vm", nom: "2x Cisco IOSv-L2 (switches)" },
      { type: "reseau", nom: "TPs Réseau 1 à 7 complétés (VLAN, OSPF, NAT, ACL)" }
    ],
    schema_reseau: `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <!-- Site Principal -->
  <rect x="10" y="10" width="280" height="290" rx="8" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="150" y="28" text-anchor="middle" fill="#3B82F6" font-size="8">SITE PRINCIPAL</text>
  <!-- Core Router R1 -->
  <ellipse cx="150" cy="80" rx="40" ry="25" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="150" y="77" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="bold">R1-CORE</text>
  <text x="150" y="89" text-anchor="middle" fill="#78716C" font-size="7">OSPF Area 0</text>
  <!-- LAN Switch -->
  <rect x="60" y="155" width="80" height="40" rx="5" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="100" y="173" text-anchor="middle" fill="#3B82F6" font-size="8" font-weight="bold">SW-LAN</text>
  <text x="100" y="185" text-anchor="middle" fill="#78716C" font-size="7">VLAN 10/20/30</text>
  <!-- DMZ Switch -->
  <rect x="170" y="155" width="80" height="40" rx="5" fill="#1C1917" stroke="#EF4444" stroke-width="1.5"/>
  <text x="210" y="173" text-anchor="middle" fill="#EF4444" font-size="8" font-weight="bold">SW-DMZ</text>
  <text x="210" y="185" text-anchor="middle" fill="#78716C" font-size="7">VLAN 100</text>
  <!-- Serveurs DMZ -->
  <rect x="155" y="235" width="55" height="28" rx="4" fill="#1C1917" stroke="#EF4444" stroke-width="1"/>
  <text x="182" y="248" text-anchor="middle" fill="#A8A29E" font-size="7">Web/DNS</text>
  <text x="182" y="258" text-anchor="middle" fill="#78716C" font-size="6">10.0.100.x</text>
  <!-- PCs LAN -->
  <rect x="45" y="235" width="55" height="28" rx="4" fill="#1C1917" stroke="#3B82F6" stroke-width="1"/>
  <text x="72" y="248" text-anchor="middle" fill="#A8A29E" font-size="7">PCs LAN</text>
  <text x="72" y="258" text-anchor="middle" fill="#78716C" font-size="6">10.0.10-20.x</text>
  <!-- Liens site principal -->
  <line x1="150" y1="105" x2="100" y2="155" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="150" y1="105" x2="210" y2="155" stroke="#EF4444" stroke-width="1.5"/>
  <line x1="100" y1="195" x2="72" y2="235" stroke="#3B82F6" stroke-width="1"/>
  <line x1="210" y1="195" x2="182" y2="235" stroke="#EF4444" stroke-width="1"/>
  <!-- Internet/WAN -->
  <ellipse cx="370" cy="160" rx="50" ry="35" fill="#1C1917" stroke="#44403C" stroke-width="1.5"/>
  <text x="370" y="156" text-anchor="middle" fill="#A8A29E" font-size="10">🌐</text>
  <text x="370" y="170" text-anchor="middle" fill="#78716C" font-size="8">WAN/Internet</text>
  <line x1="190" y1="80" x2="320" y2="145" stroke="#F59E0B" stroke-width="2"/>
  <!-- Site Secondaire -->
  <rect x="450" y="10" width="180" height="180" rx="8" fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.2)" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="540" y="28" text-anchor="middle" fill="#10B981" font-size="8">SITE SECONDAIRE</text>
  <ellipse cx="540" cy="90" rx="40" ry="25" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="540" y="87" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="bold">R2-EDGE</text>
  <text x="540" y="99" text-anchor="middle" fill="#78716C" font-size="7">OSPF Area 1</text>
  <rect x="490" y="145" width="100" height="35" rx="5" fill="#1C1917" stroke="#10B981" stroke-width="1.5"/>
  <text x="540" y="160" text-anchor="middle" fill="#10B981" font-size="8" font-weight="bold">SW-SITE2</text>
  <text x="540" y="172" text-anchor="middle" fill="#78716C" font-size="7">VLAN 50/60</text>
  <line x1="540" y1="115" x2="540" y2="145" stroke="#10B981" stroke-width="1.5"/>
  <line x1="420" y1="160" x2="500" y2="110" stroke="#F59E0B" stroke-width="2"/>
  <!-- VPN label -->
  <text x="370" y="220" text-anchor="middle" fill="#8B5CF6" font-size="8" font-weight="bold">VPN Site-to-Site</text>
  <line x1="190" y1="90" x2="490" y2="100" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="6,3"/>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Conception et plan d'adressage",
        contexte: "Avant de toucher GNS3, on conçoit l'infrastructure sur papier. Un plan d'adressage bien structuré facilite le routage, les ACL et la documentation. On utilise des sous-réseaux logiques par fonction.",
        commandes: [
          { os: "both", cmd: "# Plan d'adressage :\n# 10.0.0.0/8 — Réseau global entreprise\n#\n# Site Principal :\n# 10.0.10.0/24  — LAN VLAN 10 (Admins)\n# 10.0.20.0/24  — LAN VLAN 20 (Users)\n# 10.0.30.0/24  — LAN VLAN 30 (Serveurs internes)\n# 10.0.100.0/24 — DMZ (Serveurs publics)\n# 10.0.0.0/30   — Lien WAN R1↔Internet\n#\n# Site Secondaire :\n# 10.1.50.0/24  — LAN VLAN 50\n# 10.1.60.0/24  — LAN VLAN 60\n# 10.1.0.0/30   — Lien WAN R2↔Internet\n#\n# Liens inter-routeurs /30 :\n# 10.255.0.0/30  — R1↔R2 (backbone)", commentaire: "Plan d'adressage complet — à documenter dans le dossier BTS" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Déployer OSPF multi-zone",
        contexte: "On configure OSPF avec deux zones : Area 0 (backbone, site principal) et Area 1 (site secondaire). R1 est l'ABR (Area Border Router) qui fait la liaison entre les zones.",
        commandes: [
          { os: "linux", cmd: "! R1 — ABR Area 0 + Area 1 :\nR1(config)# router ospf 1\nR1(config-router)# router-id 1.1.1.1\nR1(config-router)# network 10.0.0.0 0.0.255.255 area 0\nR1(config-router)# network 10.255.0.0 0.0.0.3 area 1\nR1(config-router)# passive-interface GigabitEthernet0/2", commentaire: "R1 annonce LAN en Area 0 et lien vers R2 en Area 1" },
          { os: "linux", cmd: "! R2 — Area 1 uniquement :\nR2(config)# router ospf 1\nR2(config-router)# router-id 2.2.2.2\nR2(config-router)# network 10.1.0.0 0.0.255.255 area 1\nR2(config-router)# network 10.255.0.0 0.0.0.3 area 1", commentaire: "R2 en Area 1 — voit le réseau site secondaire" },
          { os: "linux", cmd: "R1# show ip ospf neighbor\nR1# show ip route ospf\nR1# show ip ospf border-routers", commentaire: "Vérifier voisins OSPF, routes et ABR" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — VLANs, trunk et Router-on-a-Stick",
        contexte: "On configure les VLANs sur les switches et le routage inter-VLAN via sous-interfaces sur R1. La DMZ est isolée sur un switch dédié avec ACL strictes.",
        commandes: [
          { os: "linux", cmd: "! SW-LAN — VLANs et trunk :\nSW-LAN(config)# vlan 10\nSW-LAN(config-vlan)# name ADMINS\nSW-LAN(config)# vlan 20\nSW-LAN(config-vlan)# name USERS\nSW-LAN(config)# vlan 30\nSW-LAN(config-vlan)# name SERVEURS\nSW-LAN(config)# interface GigabitEthernet0/1\nSW-LAN(config-if)# switchport trunk encapsulation dot1q\nSW-LAN(config-if)# switchport mode trunk", commentaire: "VLANs LAN + trunk vers R1" },
          { os: "linux", cmd: "! R1 — Sous-interfaces inter-VLAN :\nR1(config)# interface GigabitEthernet0/0.10\nR1(config-subif)# encapsulation dot1Q 10\nR1(config-subif)# ip address 10.0.10.1 255.255.255.0\nR1(config)# interface GigabitEthernet0/0.20\nR1(config-subif)# encapsulation dot1Q 20\nR1(config-subif)# ip address 10.0.20.1 255.255.255.0\nR1(config)# interface GigabitEthernet0/0.30\nR1(config-subif)# encapsulation dot1Q 30\nR1(config-subif)# ip address 10.0.30.1 255.255.255.0", commentaire: "Sous-interfaces pour chaque VLAN" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — DMZ et ACL de filtrage",
        contexte: "La DMZ héberge les serveurs accessibles depuis Internet (Web, DNS). On isole la DMZ avec des ACL : les serveurs DMZ n'ont pas accès au LAN interne, et seuls les ports 80/443/53 sont accessibles depuis l'extérieur.",
        commandes: [
          { os: "linux", cmd: "! ACL de protection DMZ — appliquer sur interface vers DMZ :\nR1(config)# ip access-list extended PROTECT-DMZ\nR1(config-ext-nacl)# permit tcp any host 10.0.100.10 eq 80\nR1(config-ext-nacl)# permit tcp any host 10.0.100.10 eq 443\nR1(config-ext-nacl)# permit udp any host 10.0.100.20 eq 53\nR1(config-ext-nacl)# deny ip 10.0.100.0 0.0.0.255 10.0.0.0 0.0.255.255 log\nR1(config-ext-nacl)# permit ip any any", commentaire: "Autoriser HTTP/HTTPS/DNS vers DMZ, bloquer DMZ → LAN" },
          { os: "linux", cmd: "R1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip access-group PROTECT-DMZ in", commentaire: "Appliquer ACL sur l'interface DMZ en entrée" },
          { os: "linux", cmd: "R1# show ip access-lists PROTECT-DMZ", commentaire: "Vérifier les compteurs de matches après tests" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 5 — NAT et documentation finale",
        contexte: "On configure le NAT/PAT pour l'accès Internet du LAN interne et on documente l'infrastructure complète : schéma réseau, tableau d'adressage, configurations sauvegardées.",
        commandes: [
          { os: "linux", cmd: "! NAT/PAT sur R1 :\nR1(config)# access-list 10 permit 10.0.0.0 0.0.255.255\nR1(config)# ip nat inside source list 10 interface GigabitEthernet0/0 overload\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# ip nat outside\nR1(config)# interface GigabitEthernet0/1\nR1(config-if)# ip nat inside", commentaire: "PAT pour tout le réseau interne 10.0.0.0/16" },
          { os: "linux", cmd: "! Sauvegarder les configurations :\nR1# copy running-config tftp\n! Ou vers un fichier :\nR1# show running-config | redirect tftp://192.168.1.100/R1-config.txt", commentaire: "Sauvegarder les configs pour le dossier BTS" },
          { os: "linux", cmd: "# Tests de validation complets :\n# Ping LAN VLAN 10 → VLAN 20 : OK (inter-VLAN)\n# Ping LAN → DMZ HTTP port 80 : OK\n# Ping DMZ → LAN 10.0.10.x : BLOQUÉ (ACL)\n# Ping Site1 → Site2 (10.1.50.x) : OK (OSPF)\n# show ip route sur R1 : toutes les routes présentes", commentaire: "Checklist de validation de l'infrastructure complète" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Plan d'adressage complet documenté avec tous les sous-réseaux",
      "OSPF Area 0 et Area 1 : voisins en état FULL, routes inter-sites visibles",
      "VLANs 10/20/30 sur SW-LAN : ping inter-VLAN via R1 fonctionnel",
      "DMZ isolée : ping DMZ → LAN bloqué par ACL PROTECT-DMZ",
      "HTTP port 80 vers serveur DMZ : autorisé depuis l'extérieur",
      "NAT/PAT : LAN interne accède à Internet via R1",
      "Configurations sauvegardées — schéma réseau et tableau d'adressage documentés"
    ],
    tags: ["projet", "ospf", "vlan", "dmz", "acl", "nat", "gns3", "infrastructure", "bts"],
    date_ajout: "2026-05-01",
    source: "École"
  },

  /* ── TP 25 — Projets : Veille technologique cybersécurité ── */
  {
    id: 25,
    titre: "Veille technologique — Cybersécurité et flux RSS automatisés",
    categorie: "projets",
    niveau: "débutant",
    duree: 60,
    description: "Mettre en place un système de veille technologique sur la cybersécurité : sélection des sources fiables (CERT-FR, ANSSI, CVE), agrégation via RSS, organisation par catégories et intégration dans un workflow de lecture régulière. Ce projet est directement exploitable pour l'épreuve E5 du BTS SIO.",
    objectifs: [
      "Identifier les sources de veille cybersécurité de référence en France et international",
      "Configurer un agrégateur RSS (Miniflux ou FreshRSS) auto-hébergé",
      "Organiser les flux par catégories (vulnérabilités, actualités, outils, réglementaire)",
      "Mettre en place une routine de veille hebdomadaire",
      "Produire une synthèse de veille mensuelle pour le dossier BTS"
    ],
    prerequis: [
      { type: "vm", nom: "VM Debian 12 avec Docker installé (TP 17)" },
      { type: "reseau", nom: "Accès Internet pour les flux RSS" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Sources de veille cybersécurité de référence",
        contexte: "La veille commence par le choix des sources. En cybersécurité, certaines sources font autorité. On sélectionne un mix de sources institutionnelles françaises, européennes et internationales, couvrant les vulnérabilités, les alertes et l'actualité.",
        commandes: [
          { os: "both", cmd: "# Sources institutionnelles françaises :\n# CERT-FR (ANSSI) : https://www.cert.fr/avis/\n# ANSSI actualités : https://www.ssi.gouv.fr/actualite/\n# CNIL : https://www.cnil.fr/fr/flux-rss\n\n# Sources internationales de référence :\n# NIST NVD (CVE) : https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml\n# CISA Alerts : https://www.cisa.gov/uscert/ncas/alerts.xml\n# Krebs on Security : https://krebsonsecurity.com/feed/\n# The Hacker News : https://feeds.feedburner.com/TheHackersNews\n\n# Sources techniques :\n# Exploit-DB : https://www.exploit-db.com/rss.xml\n# Schneier on Security : https://www.schneier.com/feed/atom\n# IT-Connect : https://www.it-connect.fr/feed/", commentaire: "Sources validées pour une veille BTS SIO SISR complète" },
          { os: "both", cmd: "# Catégories recommandées :\n# 1. Vulnérabilités & CVE (CERT-FR, NVD, Exploit-DB)\n# 2. Alertes & Incidents (CERT-FR avis, CISA)\n# 3. Actualités générales (The Hacker News, Krebs)\n# 4. Réglementaire & RGPD (CNIL, ANSSI)\n# 5. Technique & Outils (IT-Connect, Schneier)", commentaire: "5 catégories pour couvrir tous les aspects de la cybersécurité" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Déployer FreshRSS avec Docker",
        contexte: "FreshRSS est un agrégateur RSS open-source auto-hébergé, léger et complet. On le déploie avec Docker Compose en quelques minutes.",
        commandes: [
          { os: "linux", cmd: "mkdir freshrss && cd freshrss", commentaire: "Répertoire de la stack FreshRSS" },
          { os: "linux", cmd: "# compose.yml :\nservices:\n  freshrss:\n    image: freshrss/freshrss:latest\n    container_name: freshrss\n    restart: unless-stopped\n    ports:\n      - \"8080:80\"\n    environment:\n      TZ: Europe/Paris\n      CRON_MIN: \"*/30\"\n    volumes:\n      - freshrss-data:/var/www/FreshRSS/data\n      - freshrss-extensions:/var/www/FreshRSS/extensions\n\nvolumes:\n  freshrss-data:\n  freshrss-extensions:", commentaire: "Stack FreshRSS avec mise à jour des flux toutes les 30 minutes" },
          { os: "linux", cmd: "docker compose up -d\ndocker compose ps", commentaire: "Lancer FreshRSS" },
          { os: "linux", cmd: "# Accéder à l'interface :\n# http://IP-VM:8080\n# Créer un compte admin lors du premier accès\n# Puis : Gérer → Abonnements → Ajouter un flux", commentaire: "Assistant de configuration initial" }
        ],
        erreurs_courantes: [
          {
            symptome: "FreshRSS ne met pas à jour les flux automatiquement",
            cause: "Le cron interne n'est pas actif",
            solution: "Vérifier CRON_MIN dans le compose.yml. Alternativement, ajouter un cron sur l'hôte : */30 * * * * docker exec freshrss php /var/www/FreshRSS/app/actualize_script.php"
          }
        ]
      },
      {
        titre: "Étape 3 — Configurer les flux RSS par catégorie",
        contexte: "On ajoute tous les flux RSS organisés par catégories dans FreshRSS. L'organisation par catégorie permet une lecture ciblée et efficace.",
        commandes: [
          { os: "both", cmd: "# Dans FreshRSS — Gérer → Abonnements → Ajouter un flux :\n\n# Catégorie VULNÉRABILITÉS :\n# https://www.cert.fr/avis/feed/\n# https://www.cert.fr/alertes/feed/\n\n# Catégorie ACTUALITÉS :\n# https://feeds.feedburner.com/TheHackersNews\n# https://krebsonsecurity.com/feed/\n\n# Catégorie TECHNIQUE :\n# https://www.it-connect.fr/feed/\n# https://www.schneier.com/feed/atom\n\n# Catégorie RÉGLEMENTAIRE :\n# https://www.cnil.fr/fr/flux-rss\n# https://www.ssi.gouv.fr/feed/", commentaire: "Ajouter un flux à la fois dans chaque catégorie" },
          { os: "both", cmd: "# Paramètres recommandés par flux :\n# Fréquence de mise à jour : 30 minutes (vulnérabilités) / 2h (actualités)\n# Conservation : 100 articles par flux\n# Archivage : 6 mois", commentaire: "Configurer la rétention dans Gérer → Archivage" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Routine de veille et synthèse mensuelle",
        contexte: "La veille n'a de valeur que si elle est régulière et exploitée. On définit une routine de lecture et un template de synthèse mensuelle directement utilisable pour le dossier BTS E5.",
        commandes: [
          { os: "both", cmd: "# Routine de veille recommandée :\n# Quotidien (5 min) : parcourir les alertes CERT-FR\n# Hebdomadaire (15 min) : lire les actualités cybersécurité\n# Mensuel (30 min) : produire une synthèse\n\n# Template de synthèse mensuelle BTS :\n# 1. Faits marquants du mois (3-5 événements majeurs)\n# 2. Vulnérabilités critiques (CVE avec CVSS > 9.0)\n# 3. Nouvelles menaces et techniques d'attaque\n# 4. Évolutions réglementaires (RGPD, NIS2...)\n# 5. Outils et bonnes pratiques découverts\n# 6. Impact potentiel sur notre infrastructure", commentaire: "Template de synthèse pour le dossier BTS E5" },
          { os: "linux", cmd: "# Script de génération automatique d'un rapport de veille :\n#!/bin/bash\nMOIS=$(date +%Y-%m)\nRAPPORT=\"/opt/veille/synthese-$MOIS.md\"\n\necho \"# Synthèse de veille cybersécurité — $MOIS\" > $RAPPORT\necho \"## Sources consultées\" >> $RAPPORT\necho \"- CERT-FR, ANSSI, The Hacker News, IT-Connect\" >> $RAPPORT\necho \"## Vulnérabilités critiques (CVSS >= 9.0)\" >> $RAPPORT\necho \"## Incidents notables\" >> $RAPPORT\necho \"## Évolutions réglementaires\" >> $RAPPORT\necho \"## Impact sur notre infrastructure\" >> $RAPPORT\n\necho \"Template créé : $RAPPORT\"", commentaire: "Script génère le template de synthèse mensuelle" },
          { os: "linux", cmd: "mkdir -p /opt/veille\nchmod +x /opt/veille/generer-synthese.sh\n# Planifier le 1er de chaque mois :\ncrontab -e\n# 0 9 1 * * /opt/veille/generer-synthese.sh", commentaire: "Générer automatiquement le template de synthèse le 1er du mois" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Liste des sources de veille documentée (min 8 sources dans 4 catégories)",
      "FreshRSS déployé et accessible sur http://IP:8080",
      "Flux RSS ajoutés et organisés par catégories dans FreshRSS",
      "Mise à jour automatique des flux toutes les 30 minutes fonctionnelle",
      "Template de synthèse mensuelle créé dans /opt/veille/",
      "Cron planifié pour générer le template le 1er de chaque mois",
      "Première synthèse rédigée avec au moins 3 faits marquants"
    ],
    tags: ["veille", "rss", "freshrss", "cybersecurite", "cert-fr", "anssi", "cve", "bts", "e5"],
    date_ajout: "2026-05-05",
    source: "École"
  }

,

  /* ── TP 26 — SLAM : API REST avec Python Flask ── */
  {
    id: 26,
    titre: "API REST avec Python Flask — CRUD et documentation",
    categorie: "slam",
    niveau: "intermédiaire",
    duree: 90,
    description: "Créer une API REST complète avec Python Flask : endpoints CRUD (Create, Read, Update, Delete), validation des données, authentification par token JWT, gestion des erreurs et documentation automatique avec Swagger. L'API expose des ressources d'un inventaire réseau.",
    objectifs: [
      "Créer une API REST avec Flask et les verbes HTTP (GET, POST, PUT, DELETE)",
      "Connecter l'API à une base de données SQLite via SQLAlchemy",
      "Implémenter l'authentification JWT (JSON Web Token)",
      "Valider les données entrantes et gérer les erreurs proprement",
      "Documenter l'API avec Flask-RESTX et Swagger UI"
    ],
    prerequis: [
      { type: "logiciel", nom: "Python 3.10+ installé" },
      { type: "logiciel", nom: "pip et venv disponibles" },
      { type: "reseau", nom: "Notions de base en Python (fonctions, classes, dictionnaires)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Créer l'environnement et installer Flask",
        contexte: "On crée un environnement virtuel Python isolé pour le projet. C'est la bonne pratique — chaque projet a ses propres dépendances sans conflits.",
        commandes: [
          { os: "linux", cmd: "mkdir api-inventaire && cd api-inventaire\npython3 -m venv venv\nsource venv/bin/activate", commentaire: "Créer et activer l'environnement virtuel" },
          { os: "windows", cmd: "mkdir api-inventaire && cd api-inventaire\npython -m venv venv\nvenv\\Scripts\\activate", commentaire: "Windows : activer avec Scripts\\activate" },
          { os: "linux", cmd: "pip install flask flask-sqlalchemy flask-jwt-extended flask-restx", commentaire: "Installer Flask et ses extensions" },
          { os: "linux", cmd: "pip freeze > requirements.txt", commentaire: "Sauvegarder les dépendances pour reproduction" }
        ],
        erreurs_courantes: [
          {
            symptome: "ModuleNotFoundError lors du lancement de l'API",
            cause: "L'environnement virtuel n'est pas activé",
            solution: "source venv/bin/activate (Linux) ou venv\\Scripts\\activate (Windows) avant tout pip install ou python."
          }
        ]
      },
      {
        titre: "Étape 2 — Créer l'application Flask et les modèles",
        contexte: "On structure l'application avec le pattern Application Factory et on définit les modèles de données avec SQLAlchemy ORM.",
        commandes: [
          { os: "linux", cmd: "# app.py :\nfrom flask import Flask\nfrom flask_sqlalchemy import SQLAlchemy\nfrom flask_jwt_extended import JWTManager\n\ndb = SQLAlchemy()\njwt = JWTManager()\n\ndef create_app():\n    app = Flask(__name__)\n    app.config[\'SQLALCHEMY_DATABASE_URI\'] = \'sqlite:///inventaire.db\'\n    app.config[\'JWT_SECRET_KEY\'] = \'super-secret-key-change-in-prod\'\n    db.init_app(app)\n    jwt.init_app(app)\n    return app", commentaire: "Application Factory — bonne pratique Flask" },
          { os: "linux", cmd: "# models.py :\nfrom app import db\n\nclass Equipement(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    nom = db.Column(db.String(100), nullable=False)\n    type = db.Column(db.String(50), nullable=False)\n    ip = db.Column(db.String(15), unique=True, nullable=False)\n    site = db.Column(db.String(100))\n    actif = db.Column(db.Boolean, default=True)\n\n    def to_dict(self):\n        return {\n            \'id\': self.id,\n            \'nom\': self.nom,\n            \'type\': self.type,\n            \'ip\': self.ip,\n            \'site\': self.site,\n            \'actif\': self.actif\n        }", commentaire: "Modèle Equipement avec méthode de sérialisation" },
          { os: "linux", cmd: "# Créer la DB et insérer des données de test :\npython3 -c \"\nfrom app import create_app, db\nfrom models import Equipement\napp = create_app()\nwith app.app_context():\n    db.create_all()\n    e = Equipement(nom=\'SW-CORE-01\', type=\'switch\', ip=\'10.0.0.1\', site=\'Paris\')\n    db.session.add(e)\n    db.session.commit()\n    print(\'DB créée avec données de test\')\n\"", commentaire: "Initialiser la base SQLite avec un équipement exemple" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Créer les endpoints CRUD",
        contexte: "On crée les routes REST pour chaque opération CRUD. On respecte les conventions REST : GET pour lire, POST pour créer, PUT pour modifier, DELETE pour supprimer.",
        commandes: [
          { os: "linux", cmd: "# routes.py — endpoints CRUD :\nfrom flask import Blueprint, jsonify, request\nfrom models import Equipement\nfrom app import db\n\nbp = Blueprint(\'api\', __name__, url_prefix=\'/api/v1\')\n\n# GET tous les équipements\n@bp.route(\'/equipements\', methods=[\'GET\'])\ndef get_equipements():\n    equips = Equipement.query.filter_by(actif=True).all()\n    return jsonify([\'e.to_dict() for e in equips\'])\n\n# GET un équipement par ID\n@bp.route(\'/equipements/<int:id>\', methods=[\'GET\'])\ndef get_equipement(id):\n    e = Equipement.query.get_or_404(id)\n    return jsonify(e.to_dict())\n\n# POST créer un équipement\n@bp.route(\'/equipements\', methods=[\'POST\'])\ndef create_equipement():\n    data = request.get_json()\n    if not data or not data.get(\'nom\') or not data.get(\'ip\'):\n        return jsonify({\'error\': \'nom et ip obligatoires\'}), 400\n    e = Equipement(**data)\n    db.session.add(e)\n    db.session.commit()\n    return jsonify(e.to_dict()), 201\n\n# PUT modifier un équipement\n@bp.route(\'/equipements/<int:id>\', methods=[\'PUT\'])\ndef update_equipement(id):\n    e = Equipement.query.get_or_404(id)\n    data = request.get_json()\n    for key, value in data.items():\n        setattr(e, key, value)\n    db.session.commit()\n    return jsonify(e.to_dict())\n\n# DELETE supprimer (soft delete)\n@bp.route(\'/equipements/<int:id>\', methods=[\'DELETE\'])\ndef delete_equipement(id):\n    e = Equipement.query.get_or_404(id)\n    e.actif = False\n    db.session.commit()\n    return jsonify({\'message\': \'Équipement désactivé\'}), 200", commentaire: "4 endpoints CRUD complets avec gestion d'erreurs basique" },
          { os: "linux", cmd: "# Tester avec curl :\n# GET tous :\ncurl http://localhost:5000/api/v1/equipements\n\n# POST créer :\ncurl -X POST http://localhost:5000/api/v1/equipements \\\n  -H \"Content-Type: application/json\" \\\n  -d \'{\"nom\": \"R1-CORE\", \"type\": \"routeur\", \"ip\": \"10.0.0.2\", \"site\": \"Lyon\"}\'\n\n# PUT modifier :\ncurl -X PUT http://localhost:5000/api/v1/equipements/1 \\\n  -H \"Content-Type: application/json\" \\\n  -d \'{\"site\": \"Marseille\"}\'\n\n# DELETE :\ncurl -X DELETE http://localhost:5000/api/v1/equipements/1", commentaire: "Tests curl de tous les endpoints CRUD" }
        ],
        erreurs_courantes: [
          {
            symptome: "405 Method Not Allowed sur un endpoint",
            cause: "Le verbe HTTP utilisé (POST, PUT...) n'est pas dans la liste methods=[] de la route",
            solution: "Vérifier que methods=['GET','POST'] contient bien le verbe utilisé. Par défaut Flask n'accepte que GET."
          }
        ]
      },
      {
        titre: "Étape 4 — Authentification JWT",
        contexte: "On protège les endpoints de modification avec JWT. L'utilisateur s'authentifie via /login et reçoit un token qu'il doit envoyer dans le header Authorization pour les requêtes suivantes.",
        commandes: [
          { os: "linux", cmd: "# Endpoint de login :\n@bp.route(\'/login\', methods=[\'POST\'])\ndef login():\n    from flask_jwt_extended import create_access_token\n    data = request.get_json()\n    # En prod : vérifier en base de données\n    if data.get(\'username\') == \'admin\' and data.get(\'password\') == \'admin123\':\n        token = create_access_token(identity=\'admin\')\n        return jsonify({\'access_token\': token})\n    return jsonify({\'error\': \'Identifiants invalides\'}), 401", commentaire: "Endpoint /login retourne un JWT valide 1h" },
          { os: "linux", cmd: "# Protéger un endpoint avec @jwt_required() :\nfrom flask_jwt_extended import jwt_required\n\n@bp.route(\'/equipements\', methods=[\'POST\'])\n@jwt_required()\ndef create_equipement():\n    # ... reste du code", commentaire: "Décorateur @jwt_required() — retourne 401 si pas de token valide" },
          { os: "linux", cmd: "# Test avec curl :\n# 1. Obtenir le token :\nTOKEN=$(curl -s -X POST http://localhost:5000/api/v1/login \\\n  -H \"Content-Type: application/json\" \\\n  -d \'{\"username\": \"admin\", \"password\": \"admin123\"}\'\n  | python3 -c \"import sys,json; print(json.load(sys.stdin)[\'access_token\'])\"  )\n\n# 2. Utiliser le token :\ncurl -X POST http://localhost:5000/api/v1/equipements \\\n  -H \"Authorization: Bearer $TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d \'{\"nom\": \"FW-01\", \"type\": \"firewall\", \"ip\": \"10.0.0.3\"}\'", commentaire: "Obtenir le JWT puis l'utiliser dans les requêtes protégées" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Environnement virtuel activé, Flask et extensions installés",
      "Base SQLite créée avec modèle Equipement",
      "GET /api/v1/equipements : retourne la liste JSON",
      "POST /api/v1/equipements : crée un équipement, retourne 201",
      "PUT /api/v1/equipements/1 : modifie l'équipement",
      "DELETE /api/v1/equipements/1 : soft delete, actif=False",
      "POST /api/v1/login : retourne un JWT valide",
      "Endpoint POST protégé par @jwt_required() : 401 sans token"
    ],
    tags: ["flask", "python", "api", "rest", "crud", "jwt", "sqlalchemy", "sqlite", "slam"],
    date_ajout: "2026-05-10",
    source: "École"
  },

  /* ── TP 27 — SLAM : Base de données MySQL — conception et requêtes ── */
  {
    id: 27,
    titre: "Base de données MySQL — conception, requêtes SQL et procédures",
    categorie: "slam",
    niveau: "intermédiaire",
    duree: 75,
    description: "Concevoir une base de données relationnelle pour un parc informatique : modélisation MCD/MLD, création des tables avec contraintes, requêtes SQL avancées (jointures, agrégations, sous-requêtes) et procédures stockées. Directement applicable pour les TP BTS SIO SLAM.",
    objectifs: [
      "Concevoir un MCD et le traduire en MLD puis en schéma SQL",
      "Créer des tables avec clés primaires, étrangères et contraintes",
      "Écrire des requêtes SELECT avec jointures, GROUP BY et sous-requêtes",
      "Créer des vues, procédures stockées et triggers",
      "Sauvegarder et restaurer une base MySQL avec mysqldump"
    ],
    prerequis: [
      { type: "logiciel", nom: "MySQL 8.x ou MariaDB 10.x installé" },
      { type: "logiciel", nom: "MySQL Workbench ou DBeaver (optionnel)" },
      { type: "reseau", nom: "Notions de base SQL (SELECT, INSERT, UPDATE, DELETE)" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Installer MySQL et créer la base",
        contexte: "On installe MySQL Server sur Debian/Ubuntu, on sécurise l'installation et on crée la base de données du parc informatique.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install -y mysql-server\nsudo systemctl enable mysql --now\nsudo mysql_secure_installation", commentaire: "Installer MySQL et sécuriser l'installation (root pwd, suppression anonymes)" },
          { os: "linux", cmd: "sudo mysql -uroot -p\n-- Dans MySQL :\nCREATE DATABASE parc_info CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\nCREATE USER \'parc_user\'@\'localhost\' IDENTIFIED BY \'ParcPass123\';\nGRANT ALL PRIVILEGES ON parc_info.* TO \'parc_user\'@\'localhost\';\nFLUSH PRIVILEGES;\nUSE parc_info;", commentaire: "Créer la base et l'utilisateur dédié" }
        ],
        erreurs_courantes: [
          {
            symptome: "ERROR 1698 Access denied for user root",
            cause: "MySQL 8 utilise auth_socket par défaut pour root sur Debian",
            solution: "sudo mysql (sans -p) puis ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MonMotDePasse';"
          }
        ]
      },
      {
        titre: "Étape 2 — Créer les tables avec contraintes",
        contexte: "On traduit le MLD en SQL. Le schéma gère les sites, les salles, les équipements et les utilisateurs du parc informatique avec toutes les contraintes d'intégrité.",
        commandes: [
          { os: "linux", cmd: "-- Tables du parc informatique :\nCREATE TABLE sites (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom VARCHAR(100) NOT NULL,\n    ville VARCHAR(100) NOT NULL,\n    adresse TEXT\n);\n\nCREATE TABLE salles (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom VARCHAR(50) NOT NULL,\n    capacite INT DEFAULT 0,\n    id_site INT NOT NULL,\n    FOREIGN KEY (id_site) REFERENCES sites(id) ON DELETE CASCADE\n);\n\nCREATE TABLE types_equipement (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    libelle VARCHAR(50) NOT NULL UNIQUE\n);\n\nCREATE TABLE equipements (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom VARCHAR(100) NOT NULL,\n    adresse_ip VARCHAR(15) UNIQUE,\n    adresse_mac VARCHAR(17),\n    marque VARCHAR(50),\n    modele VARCHAR(100),\n    date_achat DATE,\n    garantie_fin DATE,\n    actif BOOLEAN DEFAULT TRUE,\n    id_type INT NOT NULL,\n    id_salle INT,\n    FOREIGN KEY (id_type) REFERENCES types_equipement(id),\n    FOREIGN KEY (id_salle) REFERENCES salles(id)\n);\n\nCREATE TABLE utilisateurs (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom VARCHAR(50) NOT NULL,\n    prenom VARCHAR(50) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    id_salle INT,\n    FOREIGN KEY (id_salle) REFERENCES salles(id)\n);\n\nCREATE TABLE affectations (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    id_equipement INT NOT NULL,\n    id_utilisateur INT NOT NULL,\n    date_debut DATE NOT NULL,\n    date_fin DATE,\n    FOREIGN KEY (id_equipement) REFERENCES equipements(id),\n    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)\n);", commentaire: "Schéma complet parc informatique avec FK et contraintes" },
          { os: "linux", cmd: "-- Insérer des données de test :\nINSERT INTO sites (nom, ville) VALUES ('Siège', 'Paris'), ('Agence Lyon', 'Lyon');\nINSERT INTO types_equipement (libelle) VALUES ('PC'), ('Switch'), ('Routeur'), ('Imprimante'), ('Serveur');\nINSERT INTO salles (nom, capacite, id_site) VALUES ('Salle A', 20, 1), ('Salle B', 15, 1), ('DataCenter', 0, 1);\nINSERT INTO equipements (nom, adresse_ip, marque, modele, date_achat, id_type, id_salle)\nVALUES\n    ('PC-ADMIN-01', '192.168.1.10', 'Dell', 'OptiPlex 7090', '2024-01-15', 1, 1),\n    ('SW-CORE', '10.0.0.1', 'Cisco', 'Catalyst 2960', '2023-06-01', 2, 3),\n    ('R1-EDGE', '10.0.0.254', 'Cisco', 'ISR 4331', '2023-06-01', 3, 3);", commentaire: "Données de test pour tester les requêtes" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 3 — Requêtes SQL avancées",
        contexte: "On écrit les requêtes utiles pour la gestion du parc : inventaire par site, équipements en fin de garantie, statistiques par type. On utilise les jointures, agrégations et sous-requêtes.",
        commandes: [
          { os: "linux", cmd: "-- Inventaire complet avec jointures :\nSELECT e.nom, e.adresse_ip, te.libelle AS type,\n       s.nom AS salle, si.ville AS site\nFROM equipements e\nJOIN types_equipement te ON e.id_type = te.id\nLEFT JOIN salles s ON e.id_salle = s.id\nLEFT JOIN sites si ON s.id_site = si.id\nWHERE e.actif = TRUE\nORDER BY si.ville, te.libelle;", commentaire: "Inventaire complet avec toutes les infos via jointures" },
          { os: "linux", cmd: "-- Équipements dont la garantie expire dans 30 jours :\nSELECT nom, marque, modele, garantie_fin,\n       DATEDIFF(garantie_fin, CURDATE()) AS jours_restants\nFROM equipements\nWHERE garantie_fin BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)\nORDER BY garantie_fin;", commentaire: "Alertes garantie — utile pour la gestion du parc" },
          { os: "linux", cmd: "-- Statistiques par type d'équipement :\nSELECT te.libelle, COUNT(*) AS total,\n       SUM(CASE WHEN e.actif THEN 1 ELSE 0 END) AS actifs\nFROM equipements e\nJOIN types_equipement te ON e.id_type = te.id\nGROUP BY te.libelle\nORDER BY total DESC;", commentaire: "Comptage et statistiques par type avec GROUP BY" },
          { os: "linux", cmd: "-- Sous-requête : équipements sans utilisateur affecté :\nSELECT nom, adresse_ip FROM equipements\nWHERE id NOT IN (\n    SELECT DISTINCT id_equipement FROM affectations\n    WHERE date_fin IS NULL\n)\nAND actif = TRUE;", commentaire: "Sous-requête NOT IN — équipements non affectés" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Vues, procédures et mysqldump",
        contexte: "On crée des vues pour simplifier les requêtes complexes, une procédure stockée pour affecter un équipement et on sauvegarde la base avec mysqldump.",
        commandes: [
          { os: "linux", cmd: "-- Vue inventaire simplifié :\nCREATE VIEW v_inventaire AS\nSELECT e.id, e.nom, e.adresse_ip, te.libelle AS type,\n       s.nom AS salle, si.ville AS site, e.actif\nFROM equipements e\nJOIN types_equipement te ON e.id_type = te.id\nLEFT JOIN salles s ON e.id_salle = s.id\nLEFT JOIN sites si ON s.id_site = si.id;\n\n-- Utilisation de la vue :\nSELECT * FROM v_inventaire WHERE site = 'Paris';", commentaire: "Vue = requête mémorisée — simplifie les SELECT complexes" },
          { os: "linux", cmd: "-- Procédure : affecter un équipement à un utilisateur :\nDELIMITER //\nCREATE PROCEDURE affecter_equipement(\n    IN p_id_equip INT,\n    IN p_id_user INT\n)\nBEGIN\n    -- Clôturer l'affectation précédente\n    UPDATE affectations\n    SET date_fin = CURDATE()\n    WHERE id_equipement = p_id_equip AND date_fin IS NULL;\n    -- Créer la nouvelle affectation\n    INSERT INTO affectations (id_equipement, id_utilisateur, date_debut)\n    VALUES (p_id_equip, p_id_user, CURDATE());\n    SELECT CONCAT('Équipement ', p_id_equip, ' affecté à utilisateur ', p_id_user) AS resultat;\nEND //\nDELIMITER ;\n\n-- Appel :\nCALL affecter_equipement(1, 1);", commentaire: "Procédure stockée avec gestion de l'historique des affectations" },
          { os: "linux", cmd: "# Sauvegarder la base avec mysqldump :\nmysqldump -u parc_user -p parc_info > backup-parc-$(date +%Y%m%d).sql", commentaire: "Export SQL complet de la base" },
          { os: "linux", cmd: "# Restaurer depuis un dump :\nmysql -u parc_user -p parc_info < backup-parc-20260510.sql", commentaire: "Import du dump SQL pour restauration" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Base parc_info créée avec utilisateur dédié parc_user",
      "6 tables créées avec clés primaires, étrangères et contraintes",
      "Données de test insérées (sites, salles, équipements, types)",
      "Requête inventaire complet avec jointures : résultats corrects",
      "Requête garanties expirantes : filtre BETWEEN fonctionnel",
      "Vue v_inventaire créée et interrogeable",
      "Procédure affecter_equipement testée et fonctionnelle",
      "mysqldump : fichier .sql créé et restauration testée"
    ],
    tags: ["mysql", "sql", "base-de-donnees", "jointure", "procedure", "vue", "mysqldump", "slam"],
    date_ajout: "2026-05-15",
    source: "École"
  },

  /* ── TP 28 — SLAM : Application web Python Flask + MySQL ── */
  {
    id: 28,
    titre: "Application web Flask + MySQL — interface de gestion du parc",
    categorie: "slam",
    niveau: "avancé",
    duree: 120,
    description: "Développer une application web complète avec Flask et MySQL pour gérer le parc informatique : interface CRUD avec formulaires HTML, authentification utilisateur avec sessions, tableaux de bord avec statistiques et export CSV. Ce projet de synthèse SLAM est directement valorisable dans le dossier BTS.",
    objectifs: [
      "Créer une application web Flask avec templates Jinja2",
      "Implémenter l'authentification par sessions avec Flask-Login",
      "Créer des formulaires HTML avec validation côté serveur",
      "Afficher des données depuis MySQL dans des tableaux paginés",
      "Exporter les données en CSV et implémenter une recherche"
    ],
    prerequis: [
      { type: "logiciel", nom: "Python 3.10+ avec venv" },
      { type: "logiciel", nom: "MySQL avec base parc_info (TP 27 recommandé)" },
      { type: "reseau", nom: "TP 26 Flask API recommandé" }
    ],
    schema_reseau: null,
    etapes: [
      {
        titre: "Étape 1 — Structure de l'application et dépendances",
        contexte: "On organise l'application avec une structure modulaire. Flask-Login gère les sessions utilisateur, Flask-WTF les formulaires avec protection CSRF, et PyMySQL la connexion MySQL.",
        commandes: [
          { os: "linux", cmd: "mkdir parc-web && cd parc-web\npython3 -m venv venv && source venv/bin/activate\npip install flask flask-sqlalchemy flask-login flask-wtf pymysql", commentaire: "Environnement et dépendances" },
          { os: "linux", cmd: "# Structure du projet :\n# parc-web/\n# ├── app.py           (Application Factory)\n# ├── config.py        (Configuration)\n# ├── models.py        (Modèles SQLAlchemy)\n# ├── routes/\n# │   ├── auth.py      (Login/Logout)\n# │   └── equipements.py (CRUD)\n# ├── templates/\n# │   ├── base.html    (Layout commun)\n# │   ├── login.html\n# │   ├── dashboard.html\n# │   └── equipements/\n# │       ├── liste.html\n# │       └── form.html\n# └── static/\n#     └── style.css", commentaire: "Arborescence modulaire Flask — bonne pratique BTS" },
          { os: "linux", cmd: "# config.py :\nclass Config:\n    SECRET_KEY = \'change-this-in-production\'\n    SQLALCHEMY_DATABASE_URI = \'mysql+pymysql://parc_user:ParcPass123@localhost/parc_info\'\n    SQLALCHEMY_TRACK_MODIFICATIONS = False\n    WTF_CSRF_ENABLED = True", commentaire: "Configuration centralisée avec URI MySQL" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 2 — Authentification avec Flask-Login",
        contexte: "On implémente un système de login avec sessions persistantes. Flask-Login gère le current_user et les routes protégées avec @login_required.",
        commandes: [
          { os: "linux", cmd: "# models.py — Modèle User pour Flask-Login :\nfrom flask_login import UserMixin\nfrom werkzeug.security import generate_password_hash, check_password_hash\nfrom app import db\n\nclass User(UserMixin, db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    password_hash = db.Column(db.String(255))\n\n    def set_password(self, password):\n        self.password_hash = generate_password_hash(password)\n\n    def check_password(self, password):\n        return check_password_hash(self.password_hash, password)", commentaire: "Modèle User avec hash bcrypt via werkzeug" },
          { os: "linux", cmd: "# routes/auth.py :\nfrom flask import Blueprint, render_template, redirect, url_for, flash, request\nfrom flask_login import login_user, logout_user, login_required\nfrom models import User\n\nbp = Blueprint(\'auth\', __name__)\n\n@bp.route(\'/login\', methods=[\'GET\', \'POST\'])\ndef login():\n    if request.method == \'POST\':\n        user = User.query.filter_by(username=request.form[\'username\']).first()\n        if user and user.check_password(request.form[\'password\']):\n            login_user(user, remember=True)\n            return redirect(url_for(\'main.dashboard\'))\n        flash(\'Identifiants incorrects\', \'error\')\n    return render_template(\'login.html\')\n\n@bp.route(\'/logout\')\n@login_required\ndef logout():\n    logout_user()\n    return redirect(url_for(\'auth.login\'))", commentaire: "Routes login/logout avec vérification du hash" }
        ],
        erreurs_courantes: [
          {
            symptome: "Redirect loop sur /login",
            cause: "Flask-Login redirige vers /login mais login_view n'est pas configuré",
            solution: "Dans app.py : login_manager.login_view = 'auth.login' et login_manager.login_message = 'Connexion requise'"
          }
        ]
      },
      {
        titre: "Étape 3 — Templates Jinja2 et interface CRUD",
        contexte: "On crée les templates HTML avec Jinja2 pour lister, créer et modifier les équipements. Le template de base (base.html) définit le layout commun avec navigation.",
        commandes: [
          { os: "linux", cmd: "<!-- templates/base.html :\n<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>{% block title %}Parc IT{% endblock %}</title>\n    <link rel=\"stylesheet\" href=\"{{ url_for(\'static\', filename=\'style.css\') }}\">\n</head>\n<body>\n    <nav>\n        <a href=\"{{ url_for(\'main.dashboard\') }}\">Dashboard</a>\n        <a href=\"{{ url_for(\'equip.liste\') }}\">Équipements</a>\n        <a href=\"{{ url_for(\'auth.logout\') }}\">Déconnexion</a>\n    </nav>\n    {% with messages = get_flashed_messages(with_categories=true) %}\n        {% for category, message in messages %}\n            <div class=\"alert alert-{{ category }}\">{{ message }}</div>\n        {% endfor %}\n    {% endwith %}\n    <main>{% block content %}{% endblock %}</main>\n</body>\n</html> -->", commentaire: "Layout de base avec navigation et messages flash" },
          { os: "linux", cmd: "<!-- templates/equipements/liste.html :\n{% extends \'base.html\' %}\n{% block content %}\n<h1>Inventaire équipements ({{ equipements|length }})</h1>\n<a href=\"{{ url_for(\'equip.nouveau\') }}\">+ Ajouter</a>\n<input type=\"text\" id=\"search\" placeholder=\"Rechercher...\">\n<table>\n    <tr><th>Nom</th><th>IP</th><th>Type</th><th>Salle</th><th>Actions</th></tr>\n    {% for e in equipements %}\n    <tr>\n        <td>{{ e.nom }}</td>\n        <td>{{ e.adresse_ip }}</td>\n        <td>{{ e.type.libelle }}</td>\n        <td>{{ e.salle.nom if e.salle else \'-\' }}</td>\n        <td>\n            <a href=\"{{ url_for(\'equip.modifier\', id=e.id) }}\">Modifier</a>\n            <a href=\"{{ url_for(\'equip.supprimer\', id=e.id) }}\">Supprimer</a>\n        </td>\n    </tr>\n    {% endfor %}\n</table>\n{% endblock %} -->", commentaire: "Template liste avec tableau et liens CRUD" }
        ],
        erreurs_courantes: []
      },
      {
        titre: "Étape 4 — Export CSV et recherche",
        contexte: "On ajoute des fonctionnalités avancées : export CSV de l'inventaire et recherche full-text côté serveur.",
        commandes: [
          { os: "linux", cmd: "# Export CSV dans routes/equipements.py :\nimport csv\nimport io\nfrom flask import make_response\n\n@bp.route(\'/equipements/export-csv\')\n@login_required\ndef export_csv():\n    equipements = Equipement.query.filter_by(actif=True).all()\n    output = io.StringIO()\n    writer = csv.writer(output)\n    writer.writerow([\'ID\', \'Nom\', \'IP\', \'Type\', \'Salle\', \'Site\'])\n    for e in equipements:\n        writer.writerow([\n            e.id, e.nom, e.adresse_ip,\n            e.type.libelle,\n            e.salle.nom if e.salle else \'-\',\n            e.salle.site.nom if e.salle else \'-\'\n        ])\n    response = make_response(output.getvalue())\n    response.headers[\'Content-Type\'] = \'text/csv\'\n    response.headers[\'Content-Disposition\'] = \'attachment; filename=inventaire.csv\'\n    return response", commentaire: "Export CSV téléchargeable depuis le navigateur" },
          { os: "linux", cmd: "# Recherche full-text :\n@bp.route(\'/equipements\')\n@login_required\ndef liste():\n    q = request.args.get(\'q\', \'\')\n    query = Equipement.query.filter_by(actif=True)\n    if q:\n        query = query.filter(\n            db.or_(\n                Equipement.nom.ilike(f\'%{q}%\'),\n                Equipement.adresse_ip.ilike(f\'%{q}%\')\n            )\n        )\n    equipements = query.order_by(Equipement.nom).all()\n    return render_template(\'equipements/liste.html\',\n                           equipements=equipements, q=q)", commentaire: "Recherche sur nom et IP avec ilike (insensible casse)" },
          { os: "linux", cmd: "# Lancer l'application :\nflask --app app run --debug --host=0.0.0.0 --port=5000\n# Accéder sur : http://IP:5000", commentaire: "Démarrer en mode debug pour le développement" }
        ],
        erreurs_courantes: []
      }
    ],
    checklist: [
      "Application Flask démarre sans erreur sur le port 5000",
      "Login /login : authentification fonctionnelle avec hash password",
      "Route protégée redirige vers /login si non authentifié",
      "Liste /equipements : tableau des équipements affiché depuis MySQL",
      "Formulaire création : nouvel équipement ajouté en base",
      "Export /equipements/export-csv : fichier CSV téléchargeable",
      "Recherche ?q=cisco : filtre les équipements par nom ou IP"
    ],
    tags: ["flask", "python", "mysql", "web", "crud", "login", "jinja2", "csv", "slam"],
    date_ajout: "2026-05-20",
    source: "École"
  },

  /* ──────────────────────────────────────────────────────────────
     TP 29 — Réseau : Infrastructure NAT + DNS Bind9 + Nginx (BTS SIO)
  ────────────────────────────────────────────────────────────── */
  {
    id: 29,
    titre: "Infrastructure réseau virtualisée : Passerelle NAT, DNS Bind9 et Nginx",
    categorie: "reseau",
    niveau: "intermédiaire",
    duree: 180,
    description: "Déployer une maquette d'infrastructure réseau d'entreprise en 3 VMs (passerelle Debian, serveur de services, poste client). La passerelle assure le routage NAT entre le LAN Host-only et Internet. Le serveur héberge un DNS local Bind9 avec zone entreprise.local et un serveur web Nginx. L'épreuve se termine par un diagnostic de pannes injectées via un script de sabotage pédagogique.",
    objectifs: [
      "Configurer les interfaces réseau d'une passerelle Debian (WAN NAT + LAN statique)",
      "Activer l'IP Forwarding de manière permanente via sysctl",
      "Mettre en place le NAT Masquerade avec iptables et le rendre persistant",
      "Installer et configurer Bind9 avec une zone locale entreprise.local",
      "Déployer un hôte virtuel Nginx accessible par nom de domaine local",
      "Diagnostiquer des pannes réseau injectées à l'aide de ping, nslookup et tcpdump"
    ],
    prerequis: [
      { type: "logiciel", nom: "VMware Workstation ou VirtualBox", lien: "https://www.virtualbox.org" },
      { type: "vm", nom: "VM 1 — Debian 12 (passerelle, 2 interfaces réseau)" },
      { type: "vm", nom: "VM 2 — Debian 12 (serveur de services, 1 interface)" },
      { type: "vm", nom: "VM 3 — Debian 12 ou Ubuntu (client, 1 interface)" },
      { type: "reseau", nom: "Réseau NAT (WAN) et réseau Host-only VMnet2 (LAN 192.168.2.0/24)" }
    ],
    schema_reseau: `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
  </defs>
  <!-- Internet -->
  <ellipse cx="80" cy="160" rx="55" ry="35" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="80" y="155" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">Internet</text>
  <text x="80" y="170" text-anchor="middle" fill="#78716C" font-size="8">NAT DHCP</text>
  <!-- VM1 Passerelle -->
  <rect x="210" y="115" width="110" height="90" rx="8" fill="#1C1917" stroke="#F59E0B" stroke-width="2"/>
  <text x="265" y="138" text-anchor="middle" fill="#F59E0B" font-size="10" font-weight="bold">VM 1</text>
  <text x="265" y="153" text-anchor="middle" fill="#A8A29E" font-size="9">Passerelle</text>
  <text x="265" y="167" text-anchor="middle" fill="#78716C" font-size="8">ens33 — DHCP</text>
  <text x="265" y="180" text-anchor="middle" fill="#78716C" font-size="8">ens34 — .2.254</text>
  <text x="265" y="193" text-anchor="middle" fill="#10B981" font-size="8">NAT + Routing</text>
  <!-- VM2 Serveur -->
  <rect x="420" y="60" width="110" height="80" rx="8" fill="#1C1917" stroke="#10B981" stroke-width="2"/>
  <text x="475" y="83" text-anchor="middle" fill="#10B981" font-size="10" font-weight="bold">VM 2</text>
  <text x="475" y="98" text-anchor="middle" fill="#A8A29E" font-size="9">Serveur</text>
  <text x="475" y="112" text-anchor="middle" fill="#78716C" font-size="8">192.168.2.2</text>
  <text x="475" y="126" text-anchor="middle" fill="#78716C" font-size="8">DNS + Nginx</text>
  <!-- VM3 Client -->
  <rect x="420" y="200" width="110" height="70" rx="8" fill="#1C1917" stroke="#8B5CF6" stroke-width="2"/>
  <text x="475" y="223" text-anchor="middle" fill="#8B5CF6" font-size="10" font-weight="bold">VM 3</text>
  <text x="475" y="238" text-anchor="middle" fill="#A8A29E" font-size="9">Client</text>
  <text x="475" y="252" text-anchor="middle" fill="#78716C" font-size="8">192.168.2.x</text>
  <text x="475" y="265" text-anchor="middle" fill="#78716C" font-size="8">Validation</text>
  <!-- Liens -->
  <line x1="135" y1="160" x2="210" y2="160" stroke="#3B82F6" stroke-width="2" marker-end="url(#arr29)"/>
  <line x1="320" y1="145" x2="420" y2="110" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,3"/>
  <line x1="320" y1="175" x2="420" y2="225" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="370" y="120" text-anchor="middle" fill="#F59E0B" font-size="8">VMnet2</text>
  <text x="370" y="210" text-anchor="middle" fill="#F59E0B" font-size="8">VMnet2</text>
  <!-- LAN label -->
  <rect x="390" y="155" width="80" height="22" rx="4" fill="#292524" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="430" y="170" text-anchor="middle" fill="#F59E0B" font-size="8">LAN 192.168.2.0/24</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Configuration des cartes réseau dans l'hyperviseur",
        contexte: "Avant toute configuration logicielle, les interfaces réseau des VMs doivent être correctement assignées dans VMware ou VirtualBox. La VM1 nécessite deux interfaces : une WAN en mode NAT (accès Internet via l'hôte) et une LAN en mode Host-only sur VMnet2. Les VM2 et VM3 n'ont qu'une interface Host-only sur VMnet2.",
        commandes: [
          { os: "both", cmd: "# VMware Workstation : VM Settings > Network Adapter\n# VM1 : Adapter 1 = NAT | Adapter 2 = Custom (VMnet2)\n# VM2 : Adapter 1 = Custom (VMnet2)\n# VM3 : Adapter 1 = Custom (VMnet2)", commentaire: "Paramétrage avant démarrage des VMs — VMware" },
          { os: "both", cmd: "# VirtualBox : Machine > Configuration > Réseau\n# VM1 : Interface 1 = NAT | Interface 2 = Réseau hôte uniquement\n# VM2 : Interface 1 = Réseau hôte uniquement\n# VM3 : Interface 1 = Réseau hôte uniquement", commentaire: "Paramétrage avant démarrage des VMs — VirtualBox" },
          { os: "linux", cmd: "ip -br link", commentaire: "Identifier les noms des interfaces (ex: ens33/ens34 ou eth0/eth1)" }
        ],
        erreurs_courantes: [
          {
            symptome: "Une seule interface visible sur la VM1 au lieu de deux",
            cause: "La deuxième carte réseau n'a pas été ajoutée dans les paramètres de la VM avant démarrage",
            solution: "Éteindre la VM, ajouter l'interface dans les paramètres hyperviseur, redémarrer puis vérifier avec ip -br link"
          }
        ]
      },
      {
        titre: "Étape 2 — Configuration IP de la passerelle Debian (VM1)",
        contexte: "La VM1 est le coeur du réseau. Son interface WAN (ens33) obtient une IP dynamique du NAT de l'hyperviseur pour accéder à Internet. Son interface LAN (ens34) reçoit l'IP statique 192.168.2.254 qui sera la passerelle par défaut des VM2 et VM3.",
        commandes: [
          { os: "linux", cmd: "nano /etc/network/interfaces", commentaire: "Éditer la configuration réseau Debian (remplacer ens33/ens34 si nécessaire)" },
          { os: "linux", cmd: "# Contenu à insérer dans /etc/network/interfaces :\n# Interface WAN\nallow-hotplug ens33\niface ens33 inet dhcp\n\n# Interface LAN\nallow-hotplug ens34\niface ens34 inet static\n    address 192.168.2.254\n    netmask 255.255.255.0", commentaire: "Configuration WAN en DHCP et LAN en statique" },
          { os: "linux", cmd: "systemctl restart networking", commentaire: "Appliquer la configuration réseau" },
          { os: "linux", cmd: "ip a", commentaire: "Vérifier que ens34 affiche bien 192.168.2.254/24" }
        ],
        erreurs_courantes: [
          {
            symptome: "systemctl restart networking échoue avec une erreur sur ens34",
            cause: "Le nom d'interface dans le fichier ne correspond pas au nom réel détecté par Debian",
            solution: "Comparer le nom dans /etc/network/interfaces avec ip -br link et corriger la casse"
          }
        ]
      },
      {
        titre: "Étape 3 — Activation permanente de l'IP Forwarding",
        contexte: "Par défaut, Linux ne transfère pas les paquets entre ses interfaces. Il faut activer le forwarding IPv4 de manière persistante pour que la VM1 route le trafic entre le LAN VMnet2 et le WAN NAT.",
        commandes: [
          { os: "linux", cmd: "nano /etc/sysctl.conf", commentaire: "Ouvrir le fichier de paramètres noyau" },
          { os: "linux", cmd: "# Décommenter ou ajouter la ligne suivante :\nnet.ipv4.ip_forward=1", commentaire: "Activer le routage IPv4 de façon permanente" },
          { os: "linux", cmd: "sysctl -p", commentaire: "Recharger les paramètres sans redémarrer — doit afficher : net.ipv4.ip_forward = 1" },
          { os: "linux", cmd: "cat /proc/sys/net/ipv4/ip_forward", commentaire: "Vérification directe — doit retourner 1" }
        ],
        erreurs_courantes: [
          {
            symptome: "sysctl -p affiche 'net.ipv4.ip_forward = 0' après modification",
            cause: "La ligne est encore commentée (#) dans sysctl.conf",
            solution: "Retirer le # en début de ligne net.ipv4.ip_forward=1 puis relancer sysctl -p"
          }
        ]
      },
      {
        titre: "Étape 4 — NAT Masquerade avec iptables (VM1)",
        contexte: "Le NAT (Masquerade) permet aux VMs du LAN d'accéder à Internet en sortant avec l'IP WAN de la passerelle. La règle iptables doit être rendue persistante avec iptables-persistent pour survivre aux redémarrages.",
        commandes: [
          { os: "linux", cmd: "iptables -t nat -A POSTROUTING -o ens33 -j MASQUERADE", commentaire: "Ajouter la règle NAT sur l'interface WAN (adapter le nom si nécessaire)" },
          { os: "linux", cmd: "iptables -t nat -L POSTROUTING -n -v", commentaire: "Vérifier que la règle MASQUERADE est bien présente" },
          { os: "linux", cmd: "apt update && apt install iptables-persistent -y", commentaire: "Installer le paquet de persistance — répondre Oui pour sauvegarder les règles IPv4" },
          { os: "linux", cmd: "# Si iptables-persistent est déjà installé, sauvegarder manuellement :\nnetfilter-persistent save", commentaire: "Sauvegarde manuelle des règles dans /etc/iptables/rules.v4" }
        ],
        erreurs_courantes: [
          {
            symptome: "Les VMs du LAN ne pingent pas Internet après redémarrage de la passerelle",
            cause: "La règle iptables n'a pas été sauvegardée et disparaît au reboot",
            solution: "Installer iptables-persistent et relancer netfilter-persistent save, puis vérifier /etc/iptables/rules.v4"
          }
        ]
      },
      {
        titre: "Étape 5 — Configuration réseau des VM2 et VM3",
        contexte: "Les VM2 et VM3 doivent avoir une IP statique dans le réseau 192.168.2.0/24 avec la passerelle 192.168.2.254 (VM1). Le DNS doit pointer vers la VM2 (qui hébergera Bind9) une fois installé.",
        commandes: [
          { os: "linux", cmd: "# Sur VM2 — /etc/network/interfaces :\nallow-hotplug ens33\niface ens33 inet static\n    address 192.168.2.2\n    netmask 255.255.255.0\n    gateway 192.168.2.254\n    dns-nameservers 192.168.2.2", commentaire: "VM2 : IP fixe .2, gateway vers VM1, DNS local sur elle-même" },
          { os: "linux", cmd: "# Sur VM3 — /etc/network/interfaces :\nallow-hotplug ens33\niface ens33 inet static\n    address 192.168.2.10\n    netmask 255.255.255.0\n    gateway 192.168.2.254\n    dns-nameservers 192.168.2.2", commentaire: "VM3 : IP fixe .10, gateway vers VM1, DNS = VM2" },
          { os: "linux", cmd: "systemctl restart networking && ping -c 3 192.168.2.254", commentaire: "Redémarrer le réseau et tester la connectivité vers la passerelle" },
          { os: "linux", cmd: "ping -c 3 8.8.8.8", commentaire: "Tester l'accès Internet via le NAT de la VM1" }
        ],
        erreurs_courantes: [
          {
            symptome: "ping 8.8.8.8 fonctionne mais pas ping google.com",
            cause: "Le DNS n'est pas encore configuré (Bind9 pas encore installé) ou dns-nameservers mal défini",
            solution: "Tester d'abord ping 8.8.8.8 pour valider le routage, puis compléter après installation de Bind9"
          }
        ]
      },
      {
        titre: "Étape 6 — Installation de Bind9 et zone entreprise.local (VM2)",
        contexte: "Bind9 sera le DNS autoritaire pour la zone locale entreprise.local. Il résoudra les noms internes (www.entreprise.local → 192.168.2.2) et redirigera les requêtes externes vers Google et Cloudflare via les forwarders.",
        commandes: [
          { os: "linux", cmd: "apt update && apt install bind9 bind9utils -y", commentaire: "Installation de Bind9 sur la VM2" },
          { os: "linux", cmd: "# /etc/bind/named.conf.options — ajouter dans options {} :\nforwarders {\n    8.8.8.8;\n    1.1.1.1;\n};", commentaire: "Configurer les redirecteurs DNS externes" },
          { os: "linux", cmd: "# /etc/bind/named.conf.local — ajouter :\nzone \"entreprise.local\" {\n    type master;\n    file \"/etc/bind/db.entreprise.local\";\n};", commentaire: "Déclarer la zone locale dans Bind9" },
          { os: "linux", cmd: "# Créer /etc/bind/db.entreprise.local :\n$TTL 604800\n@ IN SOA ns.entreprise.local. admin.entreprise.local. (\n    2026062501 ; Serial\n    604800     ; Refresh\n    86400      ; Retry\n    2419200    ; Expire\n    604800 )   ; Negative TTL\n;\n@ IN NS ns.entreprise.local.\n@ IN A  192.168.2.2\nns IN A  192.168.2.2\nwww IN CNAME entreprise.local.", commentaire: "Fichier de zone avec enregistrements SOA, NS, A et CNAME" },
          { os: "linux", cmd: "named-checkconf && named-checkzone entreprise.local /etc/bind/db.entreprise.local", commentaire: "Valider la syntaxe de la config et du fichier de zone" },
          { os: "linux", cmd: "systemctl restart bind9 && systemctl status bind9", commentaire: "Redémarrer Bind9 et vérifier qu'il est actif" }
        ],
        erreurs_courantes: [
          {
            symptome: "named-checkzone retourne une erreur 'SERVFAIL'",
            cause: "Erreur de syntaxe dans le fichier de zone (point final manquant sur les FQDN ou mauvais serial)",
            solution: "Vérifier que tous les FQDN se terminent par un point (entreprise.local.) et que le serial est un entier valide"
          },
          {
            symptome: "Bind9 démarre mais nslookup entreprise.local échoue depuis VM3",
            cause: "Le fichier /etc/resolv.conf sur VM3 ne pointe pas vers 192.168.2.2",
            solution: "Vérifier cat /etc/resolv.conf sur VM3 — doit contenir 'nameserver 192.168.2.2'"
          }
        ]
      },
      {
        titre: "Étape 7 — Installation et configuration de Nginx (VM2)",
        contexte: "Nginx servira un site web accessible via http://www.entreprise.local depuis le client VM3. On crée un hôte virtuel dédié avec son propre dossier racine.",
        commandes: [
          { os: "linux", cmd: "apt install nginx -y && systemctl enable nginx", commentaire: "Installer Nginx et l'activer au démarrage" },
          { os: "linux", cmd: "# Créer /etc/nginx/sites-available/entreprise :\nserver {\n    listen 80;\n    server_name www.entreprise.local entreprise.local;\n\n    location / {\n        root /var/www/entreprise;\n        index index.html;\n    }\n}", commentaire: "Hôte virtuel Nginx pour la zone locale" },
          { os: "linux", cmd: "mkdir -p /var/www/entreprise\necho \"<h1>Production OK - Infrastructure Entreprise</h1>\" > /var/www/entreprise/index.html", commentaire: "Créer le dossier racine et la page d'accueil de test" },
          { os: "linux", cmd: "ln -s /etc/nginx/sites-available/entreprise /etc/nginx/sites-enabled/\nnginx -t && systemctl restart nginx", commentaire: "Activer le site, tester la config et redémarrer Nginx" },
          { os: "linux", cmd: "# Depuis VM3 — test de bout en bout :\ncurl http://www.entreprise.local\n# Doit retourner : <h1>Production OK - Infrastructure Entreprise</h1>", commentaire: "Validation complète : DNS + Nginx + routage fonctionnels" }
        ],
        erreurs_courantes: [
          {
            symptome: "curl retourne 'Failed to connect' depuis VM3",
            cause: "Nginx n'écoute que sur 127.0.0.1 ou le firewall bloque le port 80",
            solution: "Vérifier 'listen 80;' dans la config (sans adresse IP restrictive) et ss -tlnp | grep 80 sur VM2"
          }
        ]
      },
      {
        titre: "Étape 8 — Phase d'évaluation : injection et diagnostic de pannes",
        contexte: "Avant d'injecter les pannes, réaliser un snapshot 'PROD-OK' sur les 3 VMs. Le script sabotage_infra.sh introduit 3 pannes : désactivation du forwarding IP et flush du NAT sur VM1, corruption des forwarders DNS et du resolv.conf sur VM2. L'objectif est de diagnostiquer chaque panne avec les outils réseau et de les corriger.",
        commandes: [
          { os: "linux", cmd: "# Créer le script sur VM1 ET VM2 :\nnano /tmp/sabotage_infra.sh\n# Coller le code source fourni dans le document d'évaluation\nchmod +x /tmp/sabotage_infra.sh", commentaire: "Préparer le script de sabotage pédagogique sur les deux VMs" },
          { os: "linux", cmd: "# Sur VM1 uniquement :\nsudo /tmp/sabotage_infra.sh --passerelle\n# Effets : ip_forward=0 + flush règles NAT", commentaire: "Injecter les pannes sur la passerelle" },
          { os: "linux", cmd: "# Sur VM2 uniquement :\nsudo /tmp/sabotage_infra.sh --serveur\n# Effets : forwarder DNS invalide + resolv.conf corrompu", commentaire: "Injecter les pannes sur le serveur de services" },
          { os: "linux", cmd: "# Depuis VM3 — Outils de diagnostic :\nping -c 3 192.168.2.254          # Tester la couche 3 vers la gateway\nping -c 3 8.8.8.8                # Tester le routage Internet\nnslookup entreprise.local 192.168.2.2  # Tester la résolution DNS interne\ncurl http://www.entreprise.local  # Tester le service web\ntcpdump -i ens33 icmp            # Capturer les paquets ICMP (VM1)", commentaire: "Commandes de diagnostic à utiliser depuis le client et la passerelle" },
          { os: "linux", cmd: "# Corrections attendues sur VM1 :\nsysctl -w net.ipv4.ip_forward=1\niptables -t nat -A POSTROUTING -o ens33 -j MASQUERADE", commentaire: "Rétablir le forwarding et le NAT sur la passerelle" },
          { os: "linux", cmd: "# Corrections attendues sur VM2 :\n# 1. Corriger /etc/bind/named.conf.options : retirer 127.127.127.127 des forwarders\n# 2. Corriger /etc/resolv.conf : nameserver 192.168.2.2\nsystemctl restart bind9", commentaire: "Rétablir Bind9 et le resolver local sur le serveur" }
        ],
        erreurs_courantes: [
          {
            symptome: "ping 192.168.2.254 OK depuis VM3 mais ping 8.8.8.8 KO",
            cause: "IP Forwarding désactivé ou règle NAT manquante sur VM1",
            solution: "Sur VM1 : cat /proc/sys/net/ipv4/ip_forward (doit être 1) et iptables -t nat -L POSTROUTING (doit contenir MASQUERADE)"
          },
          {
            symptome: "ping 8.8.8.8 OK depuis VM3 mais nslookup google.com échoue",
            cause: "Forwarder DNS invalide (127.127.127.127) injecté dans named.conf.options",
            solution: "Corriger /etc/bind/named.conf.options, retirer l'IP invalide, relancer systemctl restart bind9"
          },
          {
            symptome: "nslookup entreprise.local échoue malgré Bind9 relancé",
            cause: "/etc/resolv.conf de VM2 pointe vers 192.0.2.55 (IP invalide injectée)",
            solution: "echo 'nameserver 192.168.2.2' > /etc/resolv.conf sur VM2 — vérifier avec cat /etc/resolv.conf"
          }
        ]
      }
    ],
    checklist: [
      "VM1 — ens34 affiche 192.168.2.254/24 (ip a)",
      "VM1 — /proc/sys/net/ipv4/ip_forward retourne 1",
      "VM1 — iptables -t nat -L POSTROUTING contient une règle MASQUERADE sur ens33",
      "VM1 — règles iptables persistantes après reboot (/etc/iptables/rules.v4 existe)",
      "VM2 — named-checkconf ne retourne aucune erreur",
      "VM2 — named-checkzone entreprise.local valide le fichier de zone",
      "VM2 — Nginx actif sur le port 80 (ss -tlnp | grep 80)",
      "VM3 — ping 8.8.8.8 fonctionne (routage NAT)",
      "VM3 — nslookup entreprise.local retourne 192.168.2.2",
      "VM3 — curl http://www.entreprise.local retourne la page HTML",
      "Snapshot PROD-OK réalisé sur les 3 VMs avant injection des pannes",
      "Rapport de troubleshooting complété avec symptômes, causes et solutions"
    ],
    tags: ["debian", "nat", "iptables", "bind9", "dns", "nginx", "virtualisation", "routage", "troubleshooting", "bts-sio", "sisr"],
    date_ajout: "2026-06-25",
    source: "École"
  }


  ,

  /* ──────────────────────────────────────────────────────────────
     TP 30 — Sécurité : VPN nomade WireGuard sur pfSense (client-to-site)
  ────────────────────────────────────────────────────────────── */
  {
    id: 30,
    titre: "VPN nomade WireGuard sur pfSense — clients Ubuntu et Windows",
    categorie: "securite",
    niveau: "intermédiaire",
    duree: 120,
    description: "Déployer un VPN nomade (client-to-site) avec WireGuard sur un pare-feu pfSense. Le tunnel chiffré permet à des postes distants (Ubuntu et Windows) d'accéder au réseau LAN de l'entreprise via Internet. Ce TD couvre l'installation du package, la génération des clés cryptographiques, la configuration des interfaces logiques et règles de pare-feu, ainsi que la configuration complète des clients en CLI et via GNOME.",
    objectifs: [
      "Installer le package WireGuard sur pfSense via le gestionnaire de paquets",
      "Créer un tunnel WireGuard et générer la paire de clés du serveur pfSense",
      "Assigner le tunnel à une interface logique WG_VPN avec adressage statique",
      "Configurer les règles de pare-feu WAN (UDP/51820) et WG_VPN (Any/Any)",
      "Générer les paires de clés clientes sur Ubuntu (CLI) et Windows (client graphique)",
      "Déclarer les peers sur pfSense avec leurs clés publiques et adresses VPN /32",
      "Configurer wg0.conf et activer le tunnel Ubuntu via wg-quick et GNOME",
      "Valider la connexion : handshake wg, ping LAN, Status > WireGuard pfSense"
    ],
    prerequis: [
      { type: "logiciel", nom: "pfSense CE ou Plus (accès interface web)", lien: "https://www.pfsense.org" },
      { type: "vm", nom: "VM pfSense — WAN: VMnet8 NAT (192.168.8.10) + LAN: VMnet1 (192.168.1.10)" },
      { type: "vm", nom: "VM Ubuntu 22.04+ — VMnet8 NAT" },
      { type: "vm", nom: "VM Windows 10/11 — VMnet8 NAT" },
      { type: "reseau", nom: "Sous-réseau VPN : 10.11.12.0/27 — pfSense: .13, Ubuntu: .14, Windows: .20" }
    ],
    schema_reseau: `<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr30" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#F59E0B"/>
    </marker>
    <marker id="arr30g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#10B981"/>
    </marker>
  </defs>
  <rect x="20" y="45" width="115" height="58" rx="7" fill="#1C1917" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="77" y="68" text-anchor="middle" fill="#8B5CF6" font-size="10" font-weight="bold">Ubuntu</text>
  <text x="77" y="83" text-anchor="middle" fill="#78716C" font-size="8">192.168.8.14</text>
  <text x="77" y="96" text-anchor="middle" fill="#10B981" font-size="8">wg0: 10.11.12.14/32</text>
  <rect x="20" y="185" width="115" height="58" rx="7" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="77" y="208" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">Windows</text>
  <text x="77" y="223" text-anchor="middle" fill="#78716C" font-size="8">192.168.8.20</text>
  <text x="77" y="236" text-anchor="middle" fill="#10B981" font-size="8">vpn-wg: 10.11.12.20/32</text>
  <ellipse cx="285" cy="150" rx="58" ry="42" fill="#1C1917" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="285" y="146" text-anchor="middle" fill="#F59E0B" font-size="10">Internet</text>
  <text x="285" y="160" text-anchor="middle" fill="#78716C" font-size="8">UDP:51820</text>
  <line x1="135" y1="74" x2="228" y2="133" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr30g)"/>
  <line x1="135" y1="214" x2="228" y2="168" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr30g)"/>
  <text x="172" y="93" text-anchor="middle" fill="#10B981" font-size="7">Tunnel WG</text>
  <text x="172" y="207" text-anchor="middle" fill="#10B981" font-size="7">Tunnel WG</text>
  <rect x="385" y="88" width="130" height="124" rx="8" fill="#1C1917" stroke="#EF4444" stroke-width="2"/>
  <text x="450" y="113" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="bold">pfSense</text>
  <text x="450" y="130" text-anchor="middle" fill="#78716C" font-size="8">WAN: 192.168.8.10</text>
  <text x="450" y="145" text-anchor="middle" fill="#78716C" font-size="8">LAN: 192.168.1.10</text>
  <text x="450" y="160" text-anchor="middle" fill="#F59E0B" font-size="8">WG_VPN: 10.11.12.13</text>
  <text x="450" y="175" text-anchor="middle" fill="#A8A29E" font-size="7">Port écoute: 51820/udp</text>
  <text x="450" y="190" text-anchor="middle" fill="#A8A29E" font-size="7">Peers: .14 .20</text>
  <line x1="343" y1="150" x2="385" y2="150" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr30)"/>
  <rect x="568" y="118" width="100" height="64" rx="7" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="618" y="142" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">LAN</text>
  <text x="618" y="157" text-anchor="middle" fill="#78716C" font-size="8">192.168.1.0/24</text>
  <text x="618" y="170" text-anchor="middle" fill="#78716C" font-size="8">Serveurs, NAS...</text>
  <line x1="515" y1="150" x2="568" y2="150" stroke="#3B82F6" stroke-width="1.5" marker-end="url(#arr30)"/>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Installation du package WireGuard sur pfSense",
        contexte: "WireGuard n'est pas inclus par défaut dans pfSense. Il faut l'installer via le gestionnaire de paquets intégré. Une fois installé, une nouvelle entrée WireGuard apparaît dans le menu VPN.",
        commandes: [
          { os: "both", cmd: "# Interface web pfSense :\n# System > Package Manager > Available Packages\n# Rechercher 'WireGuard' > cliquer Install\n# Attendre le message 'Installation Successful'\n# Verifier : menu VPN > WireGuard apparait", commentaire: "Installation du package via l'interface web pfSense" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le menu VPN > WireGuard n'apparait pas apres installation",
            cause: "Cache navigateur affichant l'ancienne interface pfSense",
            solution: "Forcer rechargement (Ctrl+Shift+R) ou se deconnecter/reconnecter a l'interface web pfSense"
          }
        ]
      },
      {
        titre: "Étape 2 — Création du tunnel WireGuard sur pfSense",
        contexte: "Le tunnel est l'instance centrale du serveur VPN. On génère ici la paire de clés du serveur et on définit l'adresse IP du pfSense dans le réseau VPN (10.11.12.13/27). La clé publique du serveur devra être communiquée à chaque client.",
        commandes: [
          { os: "both", cmd: "# VPN > WireGuard > Add Tunnel :\n# Enable : cocher\n# Description : WG_Server\n# Listen Port : 51820\n# Interface Keys > Generate\n#   => Copier la Public Key (necessaire pour les clients)\n# Tunnel Address : 10.11.12.13/27\n# Save Tunnel", commentaire: "Creer le tunnel et noter la cle publique pfSense" },
          { os: "both", cmd: "# Activer WireGuard globalement :\n# VPN > WireGuard > onglet Settings\n# Cocher 'Enable WireGuard'\n# Save > Apply Changes", commentaire: "Activation globale obligatoire" }
        ],
        erreurs_courantes: [
          {
            symptome: "Tunnel inactif (status rouge) apres sauvegarde",
            cause: "Option 'Enable WireGuard' dans Settings non cochee",
            solution: "VPN > WireGuard > Settings > cocher Enable WireGuard > Save > Apply Changes"
          }
        ]
      },
      {
        titre: "Étape 3 — Interface logique WG_VPN et règles de pare-feu",
        contexte: "Le tunnel doit être assigné à une interface pfSense pour supporter des règles de pare-feu. Deux règles sont nécessaires : autoriser UDP/51820 en entrée WAN, et permettre tout trafic sur l'interface VPN.",
        commandes: [
          { os: "both", cmd: "# Assigner l'interface :\n# Interfaces > Assignments\n# Available network ports : selectionner tun_wg0 > + Add\n# Cliquer sur OPT1 (ou le nom attribue)\n# Enable interface : cocher\n# Description : WG_VPN\n# IPv4 Configuration Type : Static IPv4\n# IPv4 Address : 10.11.12.13 / 27\n# Save > Apply Changes", commentaire: "Creer l'interface logique WG_VPN" },
          { os: "both", cmd: "# Regle WAN :\n# Firewall > Rules > WAN > Add\n# Action : Pass | Protocol : UDP\n# Destination : WAN address | Port : 51820\n# Save > Apply Changes", commentaire: "Autoriser les connexions VPN entrantes depuis Internet" },
          { os: "both", cmd: "# Regle WG_VPN :\n# Firewall > Rules > WG_VPN > Add\n# Action : Pass | Protocol : Any\n# Source : Any | Destination : Any\n# Save > Apply Changes", commentaire: "Autoriser tout le trafic dans le tunnel (a restreindre en prod)" }
        ],
        erreurs_courantes: [
          {
            symptome: "Handshake OK mais trafic LAN ne passe pas",
            cause: "Regle sur l'interface WG_VPN manquante",
            solution: "Firewall > Rules > WG_VPN : verifier la presence d'une regle Pass Any/Any active"
          }
        ]
      },
      {
        titre: "Étape 4 — Génération des clés et configuration des clients",
        contexte: "Chaque client a sa propre paire de clés. Sous Ubuntu : génération CLI puis création du fichier wg0.conf. Sous Windows : le client graphique génère la paire automatiquement dans un tunnel vide.",
        commandes: [
          { os: "linux", cmd: "sudo apt update && sudo apt install wireguard wireguard-tools -y", commentaire: "Installer WireGuard sur Ubuntu" },
          { os: "linux", cmd: "mkdir ~/.wireguard && cd ~/.wireguard && umask 077\nwg genkey | tee client_private.key | wg pubkey > client_public.key\ncat client_public.key", commentaire: "Generer la paire de cles et afficher la cle publique" },
          { os: "linux", cmd: "sudo nano /etc/wireguard/wg0.conf\n# Contenu :\n# [Interface]\n# PrivateKey = <contenu client_private.key>\n# Address = 10.11.12.14/32\n# DNS = 1.1.1.1\n#\n# [Peer]\n# PublicKey = <cle publique pfSense>\n# Endpoint = <IP_WAN_pfSense>:51820\n# AllowedIPs = 192.168.1.0/24, 10.11.12.0/27\n# PersistentKeepalive = 25", commentaire: "Fichier de config split-tunnel Ubuntu (remplacer les valeurs)" },
          { os: "linux", cmd: "sudo chmod 600 /etc/wireguard/wg0.conf", commentaire: "Securiser le fichier contenant la cle privee" },
          { os: "windows", cmd: "# Client WireGuard Windows :\n# Ajouter un tunnel > Ajouter un tunnel vide\n# Donner un nom : VPN_vers_pfSense\n# Copier la Public Key generee automatiquement\n# Completer :\n# [Interface] (existant)\n# Address = 10.11.12.20/32\n# DNS = 10.11.12.13\n# [Peer]\n# PublicKey = <cle publique pfSense>\n# Endpoint = <IP_WAN_pfSense>:51820\n# AllowedIPs = 192.168.1.0/24, 10.11.12.0/27\n# PersistentKeepalive = 25\n# Cliquer Enregistrer", commentaire: "Configuration split-tunnel Windows — IP VPN : 10.11.12.20" }
        ],
        erreurs_courantes: [
          {
            symptome: "wg-quick up wg0 echoue : 'RTNETLINK answers: Operation not permitted'",
            cause: "Module kernel WireGuard non charge",
            solution: "sudo modprobe wireguard && sudo wg-quick up wg0"
          }
        ]
      },
      {
        titre: "Étape 5 — Déclaration des peers sur pfSense et validation",
        contexte: "On enregistre chaque client sur pfSense avec sa clé publique et son IP VPN réservée. On valide ensuite la connexion depuis les clients et dans le tableau de bord WireGuard de pfSense.",
        commandes: [
          { os: "both", cmd: "# VPN > WireGuard > editer WG_Server > Peers > + Add Peer\n# Peer Ubuntu :\n#   Description : PC_Ubuntu\n#   Public Key : <cle publique Ubuntu>\n#   Allowed IPs : 10.11.12.14/32\n#   Keepalive : 25\n# Save\n# Peer Windows :\n#   Description : PC_Windows\n#   Public Key : <cle publique Windows>\n#   Allowed IPs : 10.11.12.20/32\n#   Keepalive : 25\n# Save > Apply Changes", commentaire: "Declarer les deux peers sur pfSense" },
          { os: "linux", cmd: "sudo wg-quick up wg0\nsudo wg", commentaire: "Demarrer le tunnel et verifier le handshake" },
          { os: "linux", cmd: "ping -c 3 10.11.12.13\nping -c 3 192.168.1.10", commentaire: "Tester la connectivite vers pfSense puis vers le LAN" },
          { os: "linux", cmd: "# Demarrage automatique au boot :\nsudo systemctl enable wg-quick@wg0.service", commentaire: "Rendre le VPN persistant sur Ubuntu" },
          { os: "windows", cmd: "# Client WireGuard > selectionner le tunnel > Activer\n# Statut doit passer a 'Active'\n# Verifier le champ 'Recu' dans Transfert (doit augmenter)\n# ping 10.11.12.13 depuis PowerShell", commentaire: "Activer et valider le tunnel Windows" },
          { os: "both", cmd: "# Verification pfSense :\n# Status > WireGuard > onglet Peers\n# 'Latest Handshake' : recente pour chaque peer\n# RX/TX : trafic visible", commentaire: "Validation cote serveur pfSense" }
        ],
        erreurs_courantes: [
          {
            symptome: "sudo wg n'affiche pas de 'latest handshake'",
            cause: "Endpoint injoignable, mauvaise cle publique serveur, ou peer non declare sur pfSense",
            solution: "Verifier 1) IP WAN pfSense dans Endpoint, 2) cle publique dans [Peer], 3) peer present dans VPN > WireGuard > Peers"
          },
          {
            symptome: "Handshake OK mais ping LAN echoue",
            cause: "AllowedIPs ne contient pas le reseau LAN ou regle pare-feu WG_VPN manquante",
            solution: "Verifier AllowedIPs (doit inclure 192.168.1.0/24) et Firewall > Rules > WG_VPN sur pfSense"
          }
        ]
      }
    ],
    checklist: [
      "Package pfSense-pkg-WireGuard visible dans Installed Packages",
      "Tunnel WG_Server actif avec cle publique generee (port 51820)",
      "Interface WG_VPN assignee : IP 10.11.12.13/27, activee",
      "Regle WAN : Pass UDP 51820 vers WAN address active",
      "Regle WG_VPN : Pass Any/Any active",
      "Paire de cles Ubuntu generee (client_private.key + client_public.key)",
      "Paire de cles Windows generee via client graphique",
      "Peer Ubuntu declare sur pfSense : cle publique + 10.11.12.14/32",
      "Peer Windows declare sur pfSense : cle publique + 10.11.12.20/32",
      "wg0.conf Ubuntu : chmod 600, PrivateKey/Address/Endpoint/AllowedIPs corrects",
      "sudo wg affiche un 'latest handshake' recent sur Ubuntu",
      "ping 10.11.12.13 et ping 192.168.1.x repond depuis les clients VPN",
      "Status > WireGuard pfSense : handshake + trafic RX/TX visibles pour chaque peer"
    ],
    tags: ["wireguard", "vpn", "pfsense", "pare-feu", "ubuntu", "windows", "client-to-site", "nomade", "chiffrement", "securite"],
    date_ajout: "2026-06-25",
    source: "École"
  }


  ,

  /* ──────────────────────────────────────────────────────────────
     TP 31 — Sécurité : IPS collaboratif CrowdSec sur Ubuntu + Bouncer nftables
  ────────────────────────────────────────────────────────────── */
  {
    id: 31,
    titre: "IPS collaboratif CrowdSec sur Ubuntu — détection, Bouncer nftables et Dashboard",
    categorie: "securite",
    niveau: "intermédiaire",
    duree: 120,
    description: "Mettre en place CrowdSec, un IPS collaboratif open-source comparable à Fail2Ban, sur un serveur Ubuntu 22.04 protégeant un serveur Apache. On installe les collections de détection, on configure l'acquisition des logs, on manipule la whitelist pour autoriser le réseau de lab, on installe le Bouncer nftables pour traduire les décisions en blocages réseau effectifs, puis on connecte le moteur au Dashboard cloud app.crowdsec.net pour visualiser les alertes en temps réel. La machine attaquante est un Kali Linux qui effectue des scans Nikto.",
    objectifs: [
      "Distinguer IDS (détection passive) et IPS (prévention active) et positionner CrowdSec",
      "Installer CrowdSec et la collection crowdsecurity/apache2 sur Ubuntu 22.04",
      "Vérifier l'acquisition des logs Apache via acquis.yaml",
      "Comprendre le rôle de la whitelist et retirer son réseau de lab pour que les scans soient détectés",
      "Lancer un scan Nikto depuis Kali et observer les décisions avec cscli decisions list",
      "Installer le Bouncer crowdsec-firewall-bouncer-nftables pour bloquer effectivement les IPs",
      "Connecter CrowdSec à la console web app.crowdsec.net et visualiser les alertes"
    ],
    prerequis: [
      { type: "vm", nom: "VM Ubuntu 22.04 — 2 interfaces : NAT (Internet) + réseau privé (192.168.1.2)" },
      { type: "vm", nom: "VM Kali Linux — 2 interfaces : NAT (Internet) + réseau privé (192.168.1.10)" },
      { type: "reseau", nom: "Réseau privé partagé entre les deux VMs (ex: VMnet2 Host-only)" },
      { type: "logiciel", nom: "Nikto préinstallé sur Kali Linux" },
      { type: "logiciel", nom: "Compte gratuit sur app.crowdsec.net (pour le Dashboard)", lien: "https://app.crowdsec.net" }
    ],
    schema_reseau: `<svg viewBox="0 0 580 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:'JetBrains Mono',monospace">
  <defs>
    <marker id="arr31r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/>
    </marker>
    <marker id="arr31g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#10B981"/>
    </marker>
  </defs>
  <!-- Kali Linux (attaquant) -->
  <rect x="20" y="80" width="120" height="80" rx="8" fill="#1C1917" stroke="#EF4444" stroke-width="2"/>
  <text x="80" y="108" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="bold">Kali Linux</text>
  <text x="80" y="124" text-anchor="middle" fill="#A8A29E" font-size="9">Attaquant</text>
  <text x="80" y="139" text-anchor="middle" fill="#78716C" font-size="8">192.168.1.10</text>
  <text x="80" y="152" text-anchor="middle" fill="#78716C" font-size="8">nikto -h .1.2</text>
  <!-- Flèche attaque -->
  <line x1="140" y1="120" x2="210" y2="120" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arr31r)"/>
  <text x="175" y="112" text-anchor="middle" fill="#EF4444" font-size="8">scan HTTP</text>
  <!-- Ubuntu + CrowdSec -->
  <rect x="210" y="40" width="175" height="180" rx="8" fill="#1C1917" stroke="#10B981" stroke-width="2"/>
  <text x="297" y="67" text-anchor="middle" fill="#10B981" font-size="11" font-weight="bold">Ubuntu 22.04</text>
  <text x="297" y="83" text-anchor="middle" fill="#78716C" font-size="8">192.168.1.2</text>
  <!-- Apache -->
  <rect x="228" y="92" width="140" height="32" rx="5" fill="#292524" stroke="#F59E0B" stroke-width="1"/>
  <text x="298" y="110" text-anchor="middle" fill="#F59E0B" font-size="9">Apache2 (port 80)</text>
  <text x="298" y="120" text-anchor="middle" fill="#78716C" font-size="7">/var/log/apache2/access.log</text>
  <!-- CrowdSec -->
  <rect x="228" y="132" width="140" height="42" rx="5" fill="#292524" stroke="#10B981" stroke-width="1"/>
  <text x="298" y="150" text-anchor="middle" fill="#10B981" font-size="9" font-weight="bold">CrowdSec</text>
  <text x="298" y="163" text-anchor="middle" fill="#78716C" font-size="7">analyse logs + decisions</text>
  <!-- Bouncer -->
  <rect x="228" y="182" width="140" height="28" rx="5" fill="#292524" stroke="#8B5CF6" stroke-width="1"/>
  <text x="298" y="200" text-anchor="middle" fill="#8B5CF6" font-size="9">Bouncer nftables</text>
  <!-- Flèche CrowdSec -> Dashboard -->
  <line x1="385" y1="153" x2="440" y2="153" stroke="#10B981" stroke-width="1.5" marker-end="url(#arr31g)"/>
  <!-- Dashboard cloud -->
  <rect x="440" y="110" width="120" height="85" rx="8" fill="#1C1917" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="500" y="133" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">Dashboard</text>
  <text x="500" y="148" text-anchor="middle" fill="#A8A29E" font-size="8">app.crowdsec.net</text>
  <text x="500" y="163" text-anchor="middle" fill="#78716C" font-size="7">Alertes / Decisions</text>
  <text x="500" y="177" text-anchor="middle" fill="#78716C" font-size="7">Scenarios / Blocklists</text>
  <text x="500" y="191" text-anchor="middle" fill="#78716C" font-size="7">Console SaaS gratuite</text>
  <!-- Label réseau privé -->
  <rect x="100" y="18" width="205" height="18" rx="4" fill="#292524" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="202" y="31" text-anchor="middle" fill="#F59E0B" font-size="8">Réseau privé 192.168.1.0/24</text>
</svg>`,
    etapes: [
      {
        titre: "Étape 1 — Préparation du lab : VMs et réseau",
        contexte: "Le lab nécessite deux VMs sur le même réseau privé (Host-only ou LAN segment dans VMware). La VM Ubuntu hébergera Apache + CrowdSec. La VM Kali sera la machine attaquante. Chacune a aussi une interface NAT pour l'accès Internet.",
        commandes: [
          { os: "both", cmd: "# Configuration VMware Workstation :\n# VM Ubuntu : Adapter 1 = NAT | Adapter 2 = Custom (VMnet2)\n# VM Kali   : Adapter 1 = NAT | Adapter 2 = Custom (VMnet2)\n# IPs réseau privé :\n#   Ubuntu : 192.168.1.2\n#   Kali   : 192.168.1.10", commentaire: "Architecture du lab — les 2 VMs sur le même segment privé" },
          { os: "linux", cmd: "# Sur Ubuntu — vérifier la connectivité avec Kali :\nip a\nping -c 3 192.168.1.10", commentaire: "Vérifier que les deux VMs se joignent avant d'installer quoi que ce soit" }
        ],
        erreurs_courantes: [
          {
            symptome: "ping entre les deux VMs échoue",
            cause: "Les interfaces Host-only ne sont pas sur le même VMnet ou les IPs statiques ne sont pas configurées",
            solution: "Vérifier que les deux adapters sont sur VMnet2 et assigner manuellement les IPs dans /etc/network/interfaces ou via nmcli"
          }
        ]
      },
      {
        titre: "Étape 2 — Installation de CrowdSec et Apache sur Ubuntu",
        contexte: "CrowdSec nécessite l'ajout de son dépôt officiel. On installe ensuite Apache2 (le service à protéger) et CrowdSec simultanément, puis on ajoute la collection de scénarios dédiée à Apache2.",
        commandes: [
          { os: "linux", cmd: "sudo apt install curl -y", commentaire: "S'assurer que curl est disponible" },
          { os: "linux", cmd: "curl -s https://install.crowdsec.net | sudo bash", commentaire: "Ajouter le dépôt officiel CrowdSec" },
          { os: "linux", cmd: "sudo apt install apache2 crowdsec -y", commentaire: "Installer Apache2 et CrowdSec en une commande" },
          { os: "linux", cmd: "sudo cscli collections install crowdsecurity/apache2", commentaire: "Installer la collection de scénarios de détection pour Apache2" },
          { os: "linux", cmd: "sudo cscli collections list", commentaire: "Vérifier que crowdsecurity/apache2 est bien listée avec status 'enabled'" }
        ],
        erreurs_courantes: [
          {
            symptome: "cscli: command not found après installation",
            cause: "Le dépôt CrowdSec n'a pas été ajouté avant apt install crowdsec",
            solution: "Relancer : curl -s https://install.crowdsec.net | sudo bash, puis sudo apt update && sudo apt install crowdsec -y"
          }
        ]
      },
      {
        titre: "Étape 3 — Vérification de l'acquisition des logs (acquis.yaml)",
        contexte: "CrowdSec analyse les fichiers de logs pour détecter les attaques. Il faut s'assurer que /etc/crowdsec/acquis.yaml pointe bien vers le log d'accès Apache2. Si le fichier est vide, il faut le remplir manuellement.",
        commandes: [
          { os: "linux", cmd: "sudo nano /etc/crowdsec/acquis.yaml", commentaire: "Vérifier ou créer l'entrée d'acquisition pour Apache2" },
          { os: "linux", cmd: "# Contenu minimal requis dans acquis.yaml :\nfilenames:\n  - /var/log/apache2/access.log\nlabels:\n  type: apache2", commentaire: "Pointer CrowdSec vers le log d'accès Apache2 avec le label de type approprié" },
          { os: "linux", cmd: "sudo systemctl restart crowdsec", commentaire: "Redémarrer CrowdSec après modification de la configuration d'acquisition" },
          { os: "linux", cmd: "sudo systemctl status crowdsec", commentaire: "Vérifier que CrowdSec est bien actif (Active: running)" }
        ],
        erreurs_courantes: [
          {
            symptome: "CrowdSec ne détecte rien même après un scan Nikto",
            cause: "acquis.yaml ne contient pas l'entrée Apache2 ou pointe vers un chemin de log inexistant",
            solution: "Vérifier que /var/log/apache2/access.log existe (sudo ls -la /var/log/apache2/) et que l'entrée acquis.yaml est correctement indentée (YAML sensible aux espaces)"
          }
        ]
      },
      {
        titre: "Étape 4 — Whitelist : retirer le réseau local pour permettre la détection en lab",
        contexte: "Par défaut, CrowdSec whiteliste les plages d'IP privées (192.168.0.0/16, 10.0.0.0/8...) pour éviter de bloquer des machines du réseau local. Dans notre lab, la machine attaquante Kali est justement dans ce réseau — il faut donc commenter la règle 192.168.0.0/16 et ajouter l'IP du serveur lui-même pour éviter l'auto-blocage.",
        commandes: [
          { os: "linux", cmd: "sudo nano /etc/crowdsec/parsers/s02-enrich/whitelists.yaml", commentaire: "Éditer le fichier de whitelist CrowdSec" },
          { os: "linux", cmd: "# Dans la section cidr:, commenter la ligne 192.168.0.0/16 :\n# cidr:\n#   - '127.0.0.0/8'\n#   - '192.168.0.0/16'   # <- commenter cette ligne\n#   - '10.0.0.0/8'\n#   - '172.16.0.0/12'\n# Dans la section ip:, ajouter l'IP du serveur pour ne pas s'autobloquer :\n# ip:\n#   - '192.168.1.2'      # <- IP du serveur Ubuntu", commentaire: "Commenter 192.168.0.0/16 et ajouter l'IP du serveur en whitelist IP" },
          { os: "linux", cmd: "sudo systemctl restart crowdsec", commentaire: "Appliquer les modifications de whitelist" }
        ],
        erreurs_courantes: [
          {
            symptome: "sudo cscli decisions list retourne 'No active decisions' meme apres un scan Nikto agressif",
            cause: "La plage 192.168.0.0/16 est encore active dans la whitelist — Kali (192.168.1.10) est ignorée",
            solution: "Commenter la ligne '- 192.168.0.0/16' dans whitelists.yaml (ajouter # devant) et relancer CrowdSec"
          }
        ]
      },
      {
        titre: "Étape 5 — Premier scan Nikto et observation des décisions CrowdSec",
        contexte: "On lance un scan Nikto depuis Kali vers le serveur Ubuntu. CrowdSec analyse les logs Apache en temps réel et génère des décisions de ban. On observe ces décisions avec cscli. À ce stade, les décisions sont enregistrées mais pas encore appliquées (pas de Bouncer) — Nikto peut encore scanner.",
        commandes: [
          { os: "linux", cmd: "# Sur la VM Kali Linux :\nnikto -h 192.168.1.2", commentaire: "Lancer le scan de vulnérabilités vers le serveur Ubuntu (remplacer l'IP si nécessaire)" },
          { os: "linux", cmd: "# Sur la VM Ubuntu, après le scan :\nsudo cscli decisions list", commentaire: "Lister les décisions de ban prises par CrowdSec — l'IP de Kali doit apparaître" },
          { os: "linux", cmd: "sudo cscli alerts list", commentaire: "Lister les alertes détaillées avec les scénarios déclenchés" },
          { os: "linux", cmd: "# Supprimer manuellement une décision (utile pour les tests) :\nsudo cscli decisions delete --ip 192.168.1.10", commentaire: "Réinitialiser le ban de Kali pour pouvoir refaire des tests" }
        ],
        erreurs_courantes: [
          {
            symptome: "cscli decisions list reste vide après le scan Nikto",
            cause: "La whitelist 192.168.0.0/16 n'a pas encore été commentée ou CrowdSec n'a pas été redémarré après modification",
            solution: "Vérifier whitelists.yaml, commenter 192.168.0.0/16, puis sudo systemctl restart crowdsec et relancer le scan Nikto"
          }
        ]
      },
      {
        titre: "Étape 6 — Installation du Bouncer nftables : rendre les blocages effectifs",
        contexte: "CrowdSec détecte et enregistre des décisions, mais sans Bouncer, aucun blocage réseau n'est appliqué. Le Bouncer crowdsec-firewall-bouncer-nftables lit les décisions de CrowdSec et crée des règles nftables pour bloquer les IPs bannies au niveau du pare-feu système.",
        commandes: [
          { os: "linux", cmd: "sudo apt install crowdsec-firewall-bouncer-nftables -y", commentaire: "Installer le Bouncer qui va interfacer CrowdSec avec nftables" },
          { os: "linux", cmd: "sudo service crowdsec restart", commentaire: "Redémarrer CrowdSec pour qu'il prenne en compte le nouveau Bouncer" },
          { os: "linux", cmd: "sudo cscli bouncers list", commentaire: "Vérifier que le Bouncer nftables est bien enregistré et actif" },
          { os: "linux", cmd: "# Tester le blocage depuis Kali après un nouveau scan Nikto :\n# Sur Kali : nikto -h 192.168.1.2\n# Résultat attendu : '+ 0 host(s) tested' — Nikto est bloqué avant de pouvoir scanner", commentaire: "Valider que le Bouncer bloque effectivement l'IP de Kali" },
          { os: "linux", cmd: "sudo nft list ruleset | grep crowdsec", commentaire: "Vérifier les règles nftables créées par le Bouncer CrowdSec" }
        ],
        erreurs_courantes: [
          {
            symptome: "Nikto continue de scanner après installation du Bouncer",
            cause: "CrowdSec n'a pas encore pris de nouvelle décision (ancienne décision supprimée) ou le Bouncer n'est pas actif",
            solution: "Vérifier sudo cscli bouncers list (statut doit être 'valid') et sudo systemctl status crowdsec-firewall-bouncer. Relancer un scan Nikto pour déclencher une nouvelle décision."
          }
        ]
      },
      {
        titre: "Étape 7 — Connexion au Dashboard cloud app.crowdsec.net",
        contexte: "CrowdSec propose une console web SaaS gratuite pour visualiser les alertes, les décisions et les statistiques de sécurité de ses Security Engines. On enrôle notre serveur Ubuntu via une commande cscli console enroll avec un token généré depuis l'interface web.",
        commandes: [
          { os: "linux", cmd: "# 1. Créer un compte sur https://app.crowdsec.net (gratuit)\n# 2. Dans la console : barre de recherche > 'Enroll a Security Engine'\n# 3. Onglet Linux/FreeBSD > copier la commande affichée\n# 4. Sur Ubuntu, coller et exécuter la commande :\nsudo cscli console enroll <token_copie_depuis_la_console>", commentaire: "Enrôler le moteur CrowdSec dans la console web — remplacer par le token réel" },
          { os: "linux", cmd: "sudo systemctl restart crowdsec", commentaire: "Redémarrer CrowdSec après l'enrôlement" },
          { os: "linux", cmd: "sudo cscli console status", commentaire: "Vérifier que la connexion à la console est établie (options manual, tainted, context doivent être activées)" },
          { os: "linux", cmd: "# Dans la console web :\n# Security Engines > accepter la demande 'Accept Enroll'\n# Le serveur Ubuntu apparait dans la liste des Engines\n# Cliquer Alerts pour visualiser les attaques Nikto avec IP, scenario, date/heure", commentaire: "Valider l'enrôlement depuis la console web et explorer les alertes" }
        ],
        erreurs_courantes: [
          {
            symptome: "Le serveur Ubuntu n'apparait pas dans la console web après l'enrôlement",
            cause: "Le redémarrage de CrowdSec n'a pas été effectué après la commande console enroll, ou le token est expiré",
            solution: "Relancer sudo systemctl restart crowdsec puis retourner dans la console web — attendre 1-2 minutes pour la synchronisation"
          }
        ]
      }
    ],
    checklist: [
      "VMs Ubuntu (192.168.1.2) et Kali (192.168.1.10) se pinguent via le réseau privé",
      "sudo cscli collections list : crowdsecurity/apache2 avec status 'enabled'",
      "acquis.yaml contient l'entrée /var/log/apache2/access.log avec label apache2",
      "whitelists.yaml : ligne 192.168.0.0/16 commentée, IP 192.168.1.2 ajoutée en whitelist IP",
      "Scan Nikto depuis Kali : sudo cscli decisions list affiche l'IP 192.168.1.10 bannie",
      "sudo cscli bouncers list : crowdsec-firewall-bouncer listé avec statut valid",
      "Nikto relancé depuis Kali retourne '0 host(s) tested' (blocage effectif par nftables)",
      "sudo cscli console status : options manual et context activées (connexion SaaS)",
      "Console web app.crowdsec.net : serveur Ubuntu visible dans Engines avec alertes Nikto"
    ],
    tags: ["crowdsec", "ips", "ids", "securite", "ubuntu", "apache2", "nftables", "bouncer", "nikto", "kali", "detection"],
    date_ajout: "2026-06-25",
    source: "École"
  }

];
window.CATEGORIES = CATEGORIES;
window.LABS = LABS;

