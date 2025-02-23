---
concept:
  id: potion
  label: Potion
  dirName: Potions
  unknownImg: images/character-unknown.jpg
  categories:
    - id: description
      label: 📝 Description
      properties:
        - id: other_names
          label: Noms alternatifs
          type: list
        - id: type
          label: Type de potion
          type: list
          source: potion_types_list
        - id: color
          label: Couleur
          type: string
          source: potion_color_list
        - id: smell
          label: Odeur
          type: string
          source: potion_smell_list
        - id: texture
          label: Texture
          type: enum
          values:
            - Liquide fluide
            - Liquide visqueux
            - Gazeux
            - Effervescent
            - Poudre
            - Plasma
        - id: temperature
          label: Température
          type: enum
          values:
            - Gelée
            - Froide
            - Tiède
            - Chaude
            - Brûlante
        - id: notes
          label: Notes
          type: textarea

    - id: crafting
      label: ⚗️ Fabrication
      properties:
        - id: required_plants
          label: Plantes requises
          type: list
          source: ~plant
        - id: crafting_difficulty
          label: Difficulté de fabrication
          type: enum
          values:
            - Très facile
            - Facile
            - Moyenne
            - Difficile
            - Très difficile
            - Extrêmement difficile
        - id: crafting_time
          label: Temps de préparation
          type: enum
          values:
            - Immédiat
            - Rapide
            - Normal
            - Long
            - Très long
            - Extrêmement long
        - id: required_objects
          label: Objets nécessaires
          type: list
          source: ~objet
        - id: notes
          label: Notes
          type: textarea

    - id: usage
      label: 🧴 Utilisation
      properties:
        - id: application_method
          label: Mode d'application
          type: list
          source: potion_application_list
        - id: effect_duration
          label: Durée des effets
          type: enum
          values:
            - Instantané
            - Quelques minutes
            - Quelques heures
            - Quelques jours
            - Quelques mois
            - Quelques années
            - Permanent
        - id: medicinal_benefits
          label: Vertus Médicinales
          type: list
          source: potion_effects_list
        - id: side_effects
          label: Effets secondaires
          type: list
          source: potion_side_effects_list
        - id: recommended_container
          label: Contenant recommandé
          type: reference
          source: ~objet
        - id: compatibility
          label: Compatibilité avec d'autres potions
          type: textarea
        - id: notes
          label: Notes
          type: textarea
---