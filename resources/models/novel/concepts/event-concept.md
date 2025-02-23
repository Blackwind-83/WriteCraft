---
concept:
  id: event
  label: Événement
  dirName: Événements
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identification
      label: 🏷️ Identification
      properties:
        - id: type
          label: Type d'événement
          type: list
          source: event_types_list
        - id: name
          label: Nom de l'événement
          type: string
        - id: date
          label: Date / Époque
          type: date
        - id: main_places
          label: Lieux principaux
          type: list
          source: ~place
        - id: duration
          label: Durée
          type: enum
          values:
            - Très court
            - Court
            - Moyenne
            - Long
            - Très long
        - id: appellations
          label: Autres Appellations
          type: list
        - id: description
          label: Description
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: context_origin
      label: 👣 Contexte & Origine
      properties:
        - id: origin
          label: Origine de l'événement
          type: textarea
        - id: causes
          label: Causes principales
          type: textarea
        - id: key_figures
          label: Personnalités principales impliquées
          type: list
          source: ~character
        - id: involved_organisations
          label: Organisations impliquées
          type: list
          source: ~organisation
        - id: involved_races
          label: Races impliquées
          type: list
          source: ~race
        - id: magic_influenced
          label: Magie utilisée ou influencée
          type: list
          source: ~magic
        - id: immediate_consequences
          label: Conséquences immédiates
          type: textarea
        - id: long_term_consequences
          label: Conséquences à long terme
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: impact_social
      label: 💥 Impact social
      properties:
        - id: demographic_changes
          label: Changements démographiques
          type: textarea
        - id: economic_impact
          label: Changement économique
          type: textarea
        - id: social_structures
          label: Évolution des relations sociales
          type: textarea
        - id: power_structures
          label: Modification des structures de pouvoir
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: repercussions_heritage_legend
      label: 🏰 Répercutions, héritage et légende
      properties:
        - id: location_transformation
          label: Transformation des lieux
          type: textarea
        - id: cultural_legacy
          label: Héritage culturel et symbolique
          type: textarea
        - id: legends_and_myths
          label: Légendes et mythes créés
          type: textarea
        - id: belief_changes
          label: Répercussions sur les croyances et pratiques
          type: textarea
        - id: notes
          label: Notes
          type: textarea
---