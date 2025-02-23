---
concept:
  id: magic
  label: Magie
  dirName: Magies
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identification
      label: 🏷️ Identification
      properties:
        - id: name
          label: Nom
          type: text
        - id: appellations
          label: Autres appellations
          type: list
        - id: type
          label: Type de magie
          type: list
          source: magic_types_list
        - id: parent_magic
          label: Magie mère
          type: list
          source: ~magic
        - id: child_magics
          label: Magies dérivées
          type: list
          source: ~magic
        - id: description
          label: Description
          type: textarea
        - id: notes
          label: Notes
          type: textarea  

    - id: origin_mythology
      label: 🔮 Origine & Mythologie
      properties:
        - id: creation_legend
          label: Légende de création
          type: textarea
        - id: primordial_sources
          label: Sources primordiales
          type: list
          source: ~object
        - id: first_users
          label: Premiers utilisateurs
          type: list
          source: ~character
        - id: major_events
          label: Événements fondateurs
          type: list
          source: ~event
        - id: divine_connections
          label: Lien avec les dieux
          type: textarea
        - id: notes
          label: Notes
          type: textarea  

    - id: rules
      label: ⚖️ Règles & Fonctionnement
      properties:
        - id: energy_source
          label: Source d'énergie
          type: list
          source: energy_sources_list
        - id: channeled_through
          label: Objets de canalisation
          type: list
          source: ~object
        - id: accessibility
          label: Accessibilité
          type: enum
          values:
            - Innée
            - Apprise
            - Héréditaire
            - Transmise
            - Divine
            - Technologique
        - id: cost
          label: Coût d'utilisation
          type: list
          source: magic_costs_list
        - id: limitations
          label: Limitations & Faiblesses
          type: textarea
        - id: risks
          label: Dangers & Effets secondaires
          type: textarea
        - id: notes
          label: Notes
          type: textarea  

    - id: practice
      label: 🏹 Pratique & Utilisation
      properties:
        - id: wielders
          label: Utilisateurs principaux
          type: list
          source: ~character
        - id: required_training
          label: Niveau de maîtrise requis
          type: enum
          values:
            - Aucun
            - Débutant
            - Intermédiaire
            - Avancé
            - Expert
            - Divin
        - id: common_spells
          label: Sorts associés
          type: list
          source: ~spell
        - id: common_uses
          label: Usages courants
          type: textarea
        - id: forbidden_uses
          label: Usages interdits
          type: textarea
        - id: notes
          label: Notes
          type: textarea  

    - id: influence
      label: 💥 Influence & Impact
      properties:
        - id: societal_impact
          label: Impact sur la société
          type: textarea
        - id: economic_impact
          label: Impact économique
          type: textarea
        - id: cultural_influence
          label: Influence culturelle & Religieuse
          type: textarea
        - id: historical_events
          label: Événements historiques liés
          type: list
          source: ~event
        - id: notes
          label: Notes
          type: textarea
---