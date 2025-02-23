---
concept:
  id: race
  label: Race
  dirName: Races
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identification
      label: 🏷️ Identification
      properties:
        - id: plural_name
          label: Nom au pluriel
          type: string
        - id: other_names
          label: Autres appellations
          type: list
        - id: status
          label: Statut
          type: enum
          values:
            - Vivante
            - Disparue
            - Mythologique
        - id: emblem
          label: Symbole emblématique
          type: string
        - id: parent_species
          label: Espèce parente
          type: string
          source: ~race
        - id: sub_species
          label: Sous-espèces
          type: list
          source: ~race
        - id: related_species
          label: Races parentes
          type: list
          source: ~race
        - id: classification
          label: Classification
          type: list
          source: classification_list
        - id: race_type
          label: Type de race
          type: list
          source: race_type_list
        - id: population_size
          label: Taille de la population
          type: enum
          values:
            - Très rare
            - Rare
            - Peu commune
            - Commune
            - Nombreuse
            - Surpeuplée

    - id: origin_history
      label: 📜 Origine & Histoire
      properties:
        - id: geographical_origin
          label: Origine géographique
          type: string
          source: ~Place
        - id: ancestral_roots
          label: Ancêtres & Créateurs
          type: string
          source: ~Race
        - id: history_mythology
          label: Histoire & Mythologie
          type: textarea
        - id: evolution
          label: Évolution à travers le temps
          type: textarea
        - id: influence_on_world
          label: Influence sur le monde
          type: textarea
        - id: legends
          label: Légendes
          type: textarea
        - id: major_figures
          label: Figures historiques marquantes
          type: list
          source: ~characters
        - id: extinction_events
          label: Événements d’extinction
          type: textarea
        - id: interactions_with_others
          label: Relations avec les autres races
          type: textarea
        - id: key_locations
          label: Lieux emblématiques liés à la race
          type: list
          source: ~Place

    - id: biological_characteristics
      label: 🧬 Caractéristiques Biologiques
      properties:
        - id: lifespan
          label: Espérance de vie (Années)
          type: number
        - id: reproduction
          label: Mode de reproduction
          type: string
          source: reproduction_list
        - id: growth_years
          label: Nombre d'années pour atteindre l'âge adulte
          type: number
        - id: biological_sex
          label: Différences biologiques selon le sexe
          type: string
        - id: diet
          label: Régime alimentaire
          type: string
        - id: immunity
          label: Immunité ou résistance naturelle
          type: string
          source: immunity_list

    - id: physical_magical_capabilities
      label: 🏋️‍♂️ Capacités Physiques & Magiques
      properties:
        - id: physical_strength
          label: Force physique
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Forte
            - Surhumaine
        - id: speed
          label: Vitesse
          type: enum
          values:
            - Très lente
            - Lente
            - Normale
            - Rapide
            - Fulgurante
        - id: endurance
          label: Endurance
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Forte
            - Inépuisable
        - id: intelligence
          label: Intelligence
          type: enum
          values:
            - Instinctive
            - Simple
            - Moyenne
            - Brillante
            - Géniale
        - id: magical_affinity
          label: Affinité magique
          type: enum
          values:
            - Nulle
            - Faible
            - Moyenne
            - Forte
            - Extrême
        - id: favored_magic
          label: Magie de prédilection
          type: list
          source: magic_types_list
        - id: regenerative_capabilities
          label: Capacités régénératives
          type: enum
          values:
            - Inexistantes
            - Faibles
            - Moyennes
            - Rapides
            - Exceptionnelles
        - id: special_abilities
          label: Pouvoirs et capacités spéciales
          type: list
        - id: combat_style
          label: Style de combat typique
          type: string
          source: combat_style_list
        - id: physical_weaknesses
          label: Faiblesses physiques
          type: list
          source: physical_weaknesses_list
        - id: magical_weaknesses
          label: Faiblesses magiques
          type: list
          source: magical_weaknesses_list

    - id: culture_society
      label: 🎭 Culture & Société
      properties:
        - id: social_structure
          label: Structure sociale
          type: string
          source: social_structure_list
        - id: leadership
          label: Type de gouvernance
          type: string
          source: governance_list
        - id: traditions
          label: Traditions et coutumes
          type: textarea
        - id: religion
          label: Croyances et spiritualité
          type: string
          source: ~religion
        - id: arts_crafts
          label: Arts et artisanat
          type: list
          source: arts_crafts_list
        - id: economy
          label: Économie
          type: list
          source: economy_list
        - id: lifestyle
          label: Mode de vie
          type: list
          source: lifestyle_list
        - id: gender_roles
          label: Rôles de genre
          type: string
          source: gender_roles_list
        - id: social_interactions
          label: Interactions sociales typiques
          type: string
          source: social_interactions_list

    - id: environment
      label: 🏠 Habitat & Environnement
      properties:
        - id: primary_habitat
          label: Habitat principal
          type: list
          source: ~Place
        - id: climate_preference
          label: Climat de prédilection
          type: string
          source: climate_list
        - id: ecosystem_role
          label: Rôle dans l'écosystème
          type: textarea
        - id: interactions_with_fauna
          label: Relations avec la faune locale
          type: textarea
        - id: natural_resources
          label: Ressources exploitées
          type: list
        - id: common_dwellings
          label: Types d’habitations
          type: string
          source: dwellings_list
        - id: territorial_behavior
          label: Comportement territorial
          type: string
          source: territorial_behavior_list
        - id: migration_patterns
          label: Migrations et déplacements
          type: string
          source: migration_patterns_list
        - id: environmental_threats
          label: Menaces naturelles
          type: string
          source: environmental_threats_list
---