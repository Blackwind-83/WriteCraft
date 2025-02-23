---
concept:
  id: material
  label: Matériau
  dirName: Matériaux
  unknownImg: images/character-unknown.jpg
  categories:
    - id: material_description
      label: 🏷️ Description
      properties:
        - id: other_name
          label: Autre appellation
          type: string
        - id: state
          label: État
          type: enum
          values:
            - Solide
            - Liquide
            - Gazeux
            - Plasma
            - Éthérique
            - Instable
            - Amorphe
        - id: type
          label: Type de matériau
          type: list
          source: material_types_list
        - id: rarity
          label: Rareté
          type: enum
          values:
            - Commun
            - Peu commun
            - Rare
            - Très rare
            - Unique
        - id: natural_source
          label: Source naturelle
          type: reference
          source: ~place
        - id: notes
          label: Notes
          type: textarea

    - id: material_properties
      label: ⚖️ Propriétés
      properties:
        - id: density
          label: Densité
          type: enum
          values:
            - Très légère
            - Légère
            - Moyenne
            - Lourde
            - Très lourde
            - Extrêmement dense
        - id: durability
          label: Durabilité
          type: enum
          values:
            - Très fragile
            - Fragile
            - Résistant
            - Très résistant
            - Indestructible
        - id: conductivity
          label: Conductivité magique
          type: enum
          values:
            - Aucune
            - Faible
            - Moyenne
            - Élevée
            - Extrême
        - id: special_effects
          label: Effets spéciaux
          type: list
          source: special_effects_list
        - id: notes
          label: Notes
          type: textarea

    - id: material_usage
      label: 🏗️ Utilisation & Transformation
      properties:
        - id: main_uses
          label: Principales utilisations
          type: textarea
        - id: object_creation
          label: Fabrication d’objets
          type: list
          source: ~object
        - id: refinement_methods
          label: Méthodes d’extraction / transformation
          type: textarea
        - id: fusion_with_other_materials
          label: Fusion avec d’autres matériaux
          type: textarea
        - id: created_from
          label: Matériaux d’origine
          type: list
          source: ~material
        - id: can_create
          label: Matériaux pouvant être créés
          type: list
          source: ~material
        - id: notes
          label: Notes
          type: textarea

    - id: material_history_and_culture
      label: 📜 Histoire & Culture
      properties:
        - id: historical_use
          label: Utilisation historique
          type: textarea
        - id: associated_legends
          label: Légendes et mythes
          type: textarea
        - id: market_value
          label: Valeur marchande
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Élevée
            - Inestimable
        - id: notes
          label: Notes
          type: textarea
---