---
concept:
  id: spell
  label: Sort
  dirName: Sorts
  unknownImg: images/character-unknown.jpg
  categories:
    - id: spell_details
      label: 📝 Détails du sort
      properties:
        - id: other_name
          label: Autre appellation
          type: string
        - id: type
          label: Type de magie
          type: list
          source: magic_types_list
        - id: difficulty
          label: Difficulté
          type: enum
          values:
            - Très facile
            - Facile
            - Moyenne
            - Difficile
            - Très difficile
        - id: target
          label: Cible
          type: enum
          values:
            - Personne
            - Objet
            - Zone spécifique
            - Tous les êtres vivants
            - Environnement (climat, terre, eau, etc.)
        - id: is_zone_spell
          label: Sort de zone
          type: boolean
        - id: description
          label: Description
          type: textarea
        - id: countermeasures
          label: Contre-sort
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: spell_origin_and_reputation
      label: 🏆 Origine et Réputation
      properties:
        - id: creator
          label: Créateur du sort
          type: reference
          source: ~character
        - id: time_of_creation
          label: Période de création
          type: date
        - id: legends_and_myths
          label: Légendes et mythes associés
          type: textarea
        - id: forbidden_use
          label: Utilisation interdite
          type: boolean
        - id: availability
          label: Accessibilité
          type: enum
          values:
            - Disponible pour tous
            - Réservé aux initiés
            - Accessible à une seule race
            - Élite uniquement
        - id: historical_events
          label: Événements historiques associés
          type: list
          source: ~event
        - id: notes
          label: Notes
          type: textarea

    - id: spell_users
      label: 🧙 Utilisateurs et Utilisation
      properties:
        - id: most_common_race
          label: Race la plus courante
          type: reference
          source: ~race
        - id: skill_requirement
          label: Exigence en compétences
          type: text
        - id: creator_race
          label: Race du créateur
          type: reference
          source: ~race
        - id: notes
          label: Notes
          type: textarea
---