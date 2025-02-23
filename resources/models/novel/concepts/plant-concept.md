---
concept:
  id: plant
  label: Plante
  dirName: Plantes
  unknownImg: images/character-unknown.jpg
  categories:
    - id: description
      label: 📝 Description
      properties:
        - id: other_names
          label: Noms alternatifs
          type: list
        - id: type
          label: Type
          type: list
          source: plant_types_list
        - id: appearance
          label: Apparence
          type: textarea
        - id: size
          label: Taille
          type: enum
          values:
            - Minuscule
            - Petite
            - Moyenne
            - Grande
            - Géante
            - Titanesque
        - id: biome
          label: Biome d’origine
          type: list
          source: biome_list
        - id: rarity
          label: Rareté
          type: enum
          values:
            - Commune
            - Inhabituelle
            - Rare
            - Unique
        - id: behavior
          label: Comportement
          type: list
          source: plant_behavior_list
        - id: notes
          label: Notes
          type: textarea

    - id: properties
      label: 🌱 Propriétés botaniques
      properties:
        - id: usable_parts
          label: Parties utilisables
          type: list
          source: plant_parts_list
        - id: potion_creation
          label: Fabrication de potions
          type: list
          source: ~potion
        - id: toxicity
          label: Toxicité
          type: enum
          values:
            - Aucune
            - Légère
            - Modérée
            - Mortelle
        - id: magical_properties
          label: Propriétés magiques
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: cultivation
      label: 🌾 Culture & Exploitation
      properties:
        - id: harvesting_requirements
          label: Prérequis de récolte
          type: textarea
        - id: growing_conditions
          label: Conditions de culture
          type: textarea
        - id: cultivation_difficulty
          label: Facilité de culture
          type: enum
          values:
            - Facile
            - Moyenne
            - Difficile
            - Impossible
        - id: growth_time
          label: Temps de croissance
          type: enum
          values:
            - Rapide
            - Normal
            - Lent
            - Très lent
        - id: required_objects
          label: Objets requis pour la cultiver
          type: list
          source: ~objet
        - id: notes
          label: Notes
          type: textarea
---