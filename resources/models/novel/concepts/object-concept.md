---
concept:
  id: object
  label: Objet
  dirName: Objets
  unknownImg: images/character-unknown.jpg
  categories:
    - id: object_details
      label: 🏺 Détails de l’objet & Nature
      properties:
        - id: other_name
          label: Autre appellation
          type: string
        - id: functionality
          label: Fonctionnement
          type: textarea
        - id: usage_restrictions
          label: Restrictions d’utilisation
          type: textarea
        - id: consumable
          label: Consommable
          type: boolean
        - id: notes
          label: Notes
          type: textarea

    - id: object_physical
      label: ⚒️ Caractéristiques physiques
      properties:
        - id: materials
          label: Matériaux
          type: list
          source: ~material
        - id: rarity
          label: Rareté
          type: enum
          values:
            - Commun
            - Peu commun
            - Rare
            - Très rare
            - Unique
        - id: weight
          label: Poids
          type: string
        - id: size
          label: Dimensions
          type: string
        - id: state
          label: État / Dégradation
          type: enum
          values:
            - Neuf
            - Usé
            - Endommagé
            - Ruiné
        - id: notes
          label: Notes
          type: textarea

    - id: object_history
      label: 📜 Histoire & Culture
      properties:
        - id: creator_species
          label: Peuple créateur
          type: reference
          source: ~race
        - id: creation_date
          label: Date de création
          type: date
        - id: historical_significance
          label: Importance historique
          type: textarea
        - id: associated_event
          label: Événement associé
          type: reference
          source: ~event
        - id: cultural_value
          label: Valeur culturelle
          type: textarea
        - id: ritual_use
          label: Utilisation rituelle
          type: boolean
        - id: notes
          label: Notes
          type: textarea

    - id: object_security
      label: ☠️ Sécurité & Impact
      properties:
        - id: dangerousness
          label: Dangerosité
          type: enum
          values:
            - Inoffensif
            - Peu dangereux
            - Dangereux
            - Extrêmement dangereux
        - id: risks
          label: Risques d’utilisation
          type: textarea
        - id: current_location
          label: Lieu d’existence
          type: reference
          source: ~place
        - id: notes
          label: Notes
          type: textarea
---