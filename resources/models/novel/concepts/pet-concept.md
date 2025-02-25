---
concept:
  id: pet
  label: Animal de compagnie
  dirName: Animaux de compagnie
  unknownImg: images/character-unknown.jpg
  categories:
    - id: pet_general_details
      label: 🏷️ Identité
      properties:
        - id: pet_name
          label: Nom de l'animal
          type: string
        - id: other_names
          label: Autres appellations
          type: list 
        - id: pet_species
          label: Espèce
          type: string
          source: ~animal 
        - id: pet_age
          label: Âge
          type: number
        - id: pet_gender
          label: Sexe
          type: enum
          values:
            - Mâle
            - Femelle
        - id: pet_breed
          label: Race
          type: string
        - id: pet_size
          label: Taille
          type: enum
          values:
            - Petit
            - Moyen
            - Grand
        - id: notes
          label: Remarques générales
          type: textarea

    - id: pet_behavior_and_health
      label: 👨‍⚕️ Comportement et santé
      properties:
        - id: pet_aggressiveness
          label: Agressivité
          type: enum
          values:
            - Aucune
            - Faible
            - Moyenne
            - Élevée
            - Très élevée
        - id: pet_energy_level
          label: Niveau d'énergie
          type: enum
          values:
            - Très faible
            - Faible
            - Moyen
            - Élevé
            - Très élevé
        - id: pet_health_status
          label: État de santé
          type: enum
          values:
            - Excellent
            - Bon
            - Moyen
            - Mauvais
            - Critique
        - id: pet_diet
          label: Habitudes alimentaires
          type: enum
          values:
            - Carnivore
            - Herbivore
            - Omnivore
            - Autre
        - id: pet_owner_relationship
          label: Relation avec le propriétaire
          type: enum
          values:
            - Affectionnée
            - Indifférente
            - Agressive
            - Complice
        - id: pet_veterinary_checkups
          label: Bilans de santé vétérinaires
          type: list
          source: ~veterinary_checkup
        - id: notes
          label: Notes comportementales et santé
          type: textarea
---