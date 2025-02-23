---
concept:
  id: animal
  label: Animal
  dirName: Animaux
  unknownImg: images/character-unknown.jpg
  categories:
    - id: description
      label: 📝 Description
      properties:
        - id: other_names
          label: Noms alternatifs
          type: list
        - id: appearance
          label: Apparence
          type: textarea
        - id: species
          label: Espèce
          type: string
          source: espece_animaux
        - id: type
          label: Type
          type: list
          source: animal_types_list
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
        - id: habitat
          label: Habitat
          type: list
          source: biome_list
        - id: color
          label: Couleur
          type: list
          source: color_list
        - id: odor
          label: Odeur
          type: list
          source: odor_list
        - id: cry
          label: Cri
          type: list
          source: sound_list
        - id: longevity
          label: Longévité
          type: enum
          values:
            - Courte
            - Moyenne
            - Longue
            - Éphémère
            - Très longue
            - Éternelle
        - id: subspecies
          label: Sous-espèces
          type: list
          source: ~animaux
        - id: parent_species
          label: Espèce parente
          type: string
          source: ~animaux
        - id: rarity
          label: Rareté
          type: enum
          values:
            - Commune
            - Inhabituelle
            - Rare
            - Unique
        - id: notes
          label: Notes
          type: textarea

    - id: abilities
      label: 💪 Capacités
      properties:
        - id: speed
          label: Vitesse
          type: enum
          values:
            - Nulle
            - Lente
            - Moyenne
            - Rapide
            - Très rapide
            - Fulgurante
        - id: strength
          label: Force
          type: enum
          values:
            - Faible
            - Moyenne
            - Forte
            - Surhumaine
        - id: agility
          label: Agilité
          type: enum
          values:
            - Faible
            - Moyenne
            - Élevée
            - Exceptionnelle
        - id: magical_abilities
          label: Capacités magiques
          type: list
          source: magical_abilities_list
        - id: physical_abilities
          label: Capacités physiques
          type: list
          source: physical_abilities_list
        - id: intelligence
          label: Intelligence
          type: enum
          values:
            - Aucune
            - Faible
            - Moyenne
            - Élevée
            - Exceptionnelle
            - Bactériologique
        - id: notes
          label: Notes
          type: textarea

    - id: behavior
      label: 💢 Comportement
      properties:
        - id: behavior_type
          label: Comportement
          type: list
          source: animal_behavior_list
        - id: diet
          label: Régime alimentaire
          type: list
          source: diet_list
        - id: reproduction_mode
          label: Mode de reproduction
          type: list
          source: reproduction_modes_list
        - id: reproduction_details
          label: Détails sur la reproduction
          type: textarea
        - id: predators
          label: Prédateurs
          type: list
          source: ~animaux
        - id: prey
          label: Proies
          type: list
          source: ~animaux
        - id: notes
          label: Notes
          type: textarea

    - id: interaction_with_humans
      label: 🤝 Interaction avec l'Homme
      properties:
        - id: usefulness
          label: Nuisible/Utile
          type: enum
          values:
            - Nuisible
            - Utile
            - Neutre
        - id: utilization
          label: Utilisation
          type: list
          source: usage_list
        - id: domesticable
          label: Domesticable
          type: boolean
        - id: object_creation
          label: Fabrication d'objets
          type: list
          source: ~objet
        - id: dangerosity
          label: Dangerosité
          type: enum
          values:
            - Faible
            - Moyenne
            - Élevée
            - Extrême
        - id: communication
          label: Communication
          type: textarea
        - id: notes
          label: Notes
          type: textarea
---