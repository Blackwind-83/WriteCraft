---
concept:
  id: character
  label: Personnage
  dirName: Personnages
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identity
      label: 🏷️ Identité
      properties:
        - id: short_description
          label: Description courte
          type: textarea
        - id: other_names
          label: Autres noms/Surnoms
          type: list
        - id: age
          label: Âge
          type: number
        - id: gender
          label: Sexe
          type: enum
          values:
            - Homme
            - Femme
            - Autre
        - id: race
          label: Race
          type: string
          source: ~race
        - id: ethnicity
          label: Ethnie
          type: string
          source: ~race
        - id: is_dead
          label: Statut de vie
          type: enum
          values:
            - Vivant
            - Décédé
        - id: birth_date
          label: Date de naissance
          type: date
        - id: birth_place
          label: Lieu de naissance
          type: string
        - id: marital_status
          label: Statut matrimonial
          type: enum
          values:
            - Célibataire
            - Marié(e)
            - Divorcé(e)
            - Veuf/Veuve
        - id: address
          label: Adresse
          type: string
        - id: job
          label: Profession
          type: string
        - id: notes
          label: Notes
          type: textarea

    - id: character_role
      label: 🎭 Rôle du personnage
      properties:
        - id: importance
          label: Importance du personnage
          type: string
          source: importance_list
        - id: type
          label: Type
          type: string
          source: character_type_list
        - id: archetype
          label: Archétype
          type: string
          source: character_archetype_list
        - id: morality
          label: Morale
          type: string
          source: morality_list
        - id: ethics
          label: Éthique
          type: string
          source: ethics_list
        - id: role
          label: Rôle
          type: textarea
        - id: synopsis
          label: Synopsis du personnage
          type: textarea
        - id: motivations
          label: Motivations profondes
          type: textarea
        - id: arc_narratif
          label: Arc narratif
          type: textarea
        - id: weaknesses
          label: Faiblesses
          type: string
          source: weaknesses_list
        - id: short_term_goals
          label: Objectifs à court terme
          type: textarea
        - id: long_term_goals
          label: Objectifs à long terme
          type: textarea
        - id: past_sufferings
          label: Souffrances/Cicatrices du passé
          type: textarea
        - id: past_mistakes
          label: Erreurs du passé
          type: textarea
        - id: secrets
          label: Secrets
          type: textarea
        - id: main_relationships
          label: Principales interactions
          type: list
          source: ~character
        - id: symbolism
          label: Symbolisme
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: physical_ppearance
      label: 🧍 Apparence physique
      properties:
        - id: height
          label: Taille
          type: number
        - id: weight
          label: Poids
          type: number
        - id: body_type
          label: Corpulence
          type: string
          source: body_types_list
        - id: posture
          label: Posture
          type: string
          source: postures_list
        - id: health_status
          label: État de santé
          type: string
          source: health_status_list
        - id: disability
          label: Handicap
          type: string
          source: disabilities_list
        - id: skin_color
          label: Couleur de peau
          type: string
          source: colors_list
        - id: hair_color
          label: Couleur de cheveux
          type: string
          source: hair_colors_list
        - id: hair_dye
          label: Teinture
          type: string
          source: colors_list
        - id: hair_style
          label: Style de cheveux
          type: string
          source: hair_styles_list
        - id: facial_hair
          label: Pilosité
          type: string
          source: facial_hair_list
        - id: eye_color
          label: Couleur des yeux
          type: string
          source: eye_colors_list
        - id: eye_shape
          label: Forme des yeux
          type: string
          source: eye_shapes_list
        - id: face_shape
          label: Forme du visage
          type: string
          source: face_shapes_list
        - id: face_marks
          label: Signes distinctifs au visage
          type: string
          source: face_marks_list
        - id: other_physical_traits
          label: Autres traits physiques distinctifs
          type: string
          source: other_physical_traits_list
        - id: clothing_style
          label: Style vestimentaire
          type: string
          source: clothing_styles_list
        - id: accessories
          label: Accessoires
          type: string
        - id: hand_preference
          label: Préférence manuelle
          type: enum
          values:
            - Droitier
            - Gaucher
            - Ambidextre
        - id: notes
          label: Notes
          type: textarea

    - id: relationship
      label: 🤝 Relation
      properties:
        - id: father
          label: Père
          type: string
          source: ~character
        - id: mother
          label: Mère
          type: string
          source: ~character
        - id: adoptive_parents
          label: Parents adoptifs
          type: list
          source: ~character
        - id: spouses
          label: Conjoints
          type: list
          source: ~character
        - id: love_interests
          label: Intérêts amoureux
          type: list
          source: ~character
        - id: illegitimate_relations
          label: Relations illégitimes
          type: list
          source: ~character
        - id: children
          label: Enfants
          type: list
          source: ~character
        - id: adopted_children
          label: Enfants adoptifs
          type: list
          source: ~character
        - id: siblings
          label: Frères et sœurs
          type: list
          source: ~character
        - id: best_friends
          label: Meilleurs amis
          type: list
          source: ~character
        - id: friends
          label: Amis
          type: list
          source: ~character
        - id: mentors
          label: Mentors
          type: list
          source: ~character
        - id: allies
          label: Alliés
          type: list
          source: ~character
        - id: familiars
          label: Familiers
          type: list
          source: ~character
        - id: organisations
          label: Organisations
          type: list
          source: ~organisation
        - id: subordinates
          label: Subordonnés
          type: list
          source: ~character
        - id: bosses
          label: Supérieurs hiérarchiques
          type: list
          source: ~character
        - id: pets
          label: Animaux de compagnie
          type: list
          source: ~pet
        - id: rivals
          label: Rivaux
          type: list
          source: ~character
        - id: enemies
          label: Ennemis
          type: list
          source: ~character
        - id: past_relationships
          label: Anciennes relations
          type: list
          source: ~character
        - id: notes
          label: Notes
          type: textarea

    - id: psychology
      label: 🤯 Psychologie
      properties:
        - id: qualities
          label: Qualités
          type: list
          source: qualities_list
        - id: flaws
          label: Défauts
          type: list
          source: flaws_list
        - id: mental_health
          label: Santé mentale
          type: string
          source: mental_health_status_list
        - id: emotional_state
          label: État émotionnel
          type: string
          source: emotional_states_list
        - id: social_behavior
          label: Comportement social
          type: string
          source: social_behavior_list
        - id: cognitive_abilities
          label: Capacités cognitives
          type: string
          source: cognitive_abilities_list
        - id: autonomy
          label: Autonomie et indépendance
          type: string
          source: autonomy_list
        - id: authority_relationship
          label: Relation à l'autorité
          type: string
          source: authority_relationship_list
        - id: behavior_under_pressure
          label: Comportement sous pression
          type: string
          source: behavior_under_pressure_list
        - id: addictions
          label: Dépendances
          type: string
        - id: tics
          label: Tics/Tocs
          type: string
        - id: dreams
          label: Rêves
          type: texstringt
        - id: fears
          label: Peurs
          type: string
        - id: likes
          label: Aime
          type: string
        - id: dislikes
          label: Déteste
          type: string
        - id: emotional_intelligence
          label: Intelligence émotionnelle
          type: enum
          values:
            - Faible
            - Moyenne
            - Bonne
            - Excellente
        - id: self_esteem
          label: Estime de soi
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Haute
            - Très haute
        - id: optimism_pessimism
          label: Optimisme/Pessimisme
          type: enum
          values:
            - Très pessimiste
            - Pessimiste
            - Neutre
            - Optimiste
            - Très optimiste
        - id: self_control
          label: Contrôle de soi
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Haute
            - Très haute
        - id: creativity
          label: Créativité
          type: enum
          values:
            - Très faible
            - Faible
            - Moyenne
            - Élevée
            - Très élevée
        - id: notes
          label: Notes
          type: textarea

    - id: social_life
      label: 🍻 Vie sociale
      properties:
        - id: social_rank
          label: Rang social
          type: string
          source: social_ranks_list
        - id: wealth
          label: Richesse
          type: enum
          values:
            - Extrêmement pauvre
            - Pauvre
            - Modeste
            - Aisé
            - Riche
            - Extrêmement riche
        - id: notoriety
          label: Notoriété
          type: enum
          values:
            - Inconnu
            - Peu connu
            - Localement connu
            - Connu régionalement
            - Célèbre
            - Très célèbre
            - Légendaire
        - id: reputation
          label: Réputation
          type: enum
          values:
            - Très mauvaise
            - Mauvaise
            - Neutre
            - Bonne
            - Excellente
            - Irréprochable
        - id: social_influence
          label: Influence sociale
          type: enum
          values:
            - Aucun impact
            - Faible
            - Modérée
            - Importante
            - Très influent
            - Figure majeure
        - id: charisma_level
          label: Niveau de charisme
          type: enum
          values:
            - Peu charismatique
            - Moyennement charismatique
            - Charismatique
            - Très charismatique
            - Fascinant
        - id: professions
          label: Métiers
          type: list
          source: professions_list
        - id: occupations
          label: Occupations
          type: list
          source: occupations_list
        - id: education
          label: Niveau d'instruction
          type: enum
          values:
            - Illettré
            - Peu instruit
            - Instruit
            - Savant
            - Érudit
        - id: languages
          label: Langues parlées
          type: list
          source: languages_list
        - id: beliefs
          label: Croyances philosophiques / idéologiques
          type: list
          source: beliefs_list
        - id: religion
          label: Confession religieuse
          type: string
          source: ~religion
        - id: hobbies
          label: Loisirs et passe-temps
          type: list
          source: hobbies_list
        - id: habits
          label: Habitudes
          type: list
          source: habits_list
        - id: sleep
          label: Sommeil
          type: enum
          values:
            - Insomniaque
            - Léger dormeur
            - Dormeur moyen
            - Gros dormeur
        - id: appetite
          label: Appétit
          type: enum
          values:
            - Sobre
            - Mangeur modéré
            - Gourmand
            - Glouton
        - id: notes
          label: Notes
          type: textarea

    - id: intellectual_skills
      label: 🧠 Aptitudes intellectuelles
      properties:
        - id: intelligence
          label: Intelligence
          type: enum
          values:
            - Déficient
            - Limité
            - Standard
            - Affûté
            - Brillant
            - Prodigieux
        - id: memory
          label: Mémoire
          type: enum
          values:
            - Défaillante
            - Faible
            - Moyenne
            - Excellente
            - Eidétique
        - id: analytical_thinking
          label: Esprit logique
          type: enum
          values:
            - Confus
            - Sommaire
            - Structuré
            - Rigoureux
            - Fulgurant
        - id: problem_solving
          label: Résolution de problèmes
          type: enum
          values:
            - Dépassé
            - Laborieux
            - Adaptatif
            - Ingénieux
            - Magistral
        - id: concentration
          label: Concentration
          type: enum
          values:
            - Dispersée
            - Inconstante
            - Moyenne
            - Focalisée
            - Imperturbable
        - id: intuition
          label: Intuitivité
          type: enum
          values:
            - Absente
            - Faible
            - Instinctive
            - Affûtée
            - Visionnaire
        - id: observation_sense
          label: Sens de l’observation
          type: enum
          values:
            - Inattentif
            - Distrait
            - Attentif
            - Méticuleux
            - Implacable
        - id: discernment
          label: Discernement
          type: enum
          values:
            - Naïf
            - Crédule
            - Prudence
            - Perspicace
            - Infaillible
        - id: general_knowledge
          label: Culture générale
          type: enum
          values:
            - Pauvre
            - Lacunaire
            - Moyenne
            - Étendue
            - Encyclopédique
        - id: strategic_reasoning
          label: Raisonnement stratégique
          type: enum
          values:
            - Brouillon
            - Basique
            - Structuré
            - Stratégique
            - Visionnaire
        - id: creativity
          label: Créativité
          type: enum
          values:
            - Stérile
            - Peu inspiré
            - Normale
            - Inventif
            - Génial
        - id: learning_speed
          label: Vitesse d’apprentissage
          type: enum
          values:
            - Lente
            - Standard
            - Rapide
            - Éclair
            - Instantanée
        - id: notes
          label: Notes
          type: textarea

    - id: physical_skills
      label: 💪 Aptitudes Physiques
      properties:
        - id: combat_experience
          label: Expérience du combat
          type: enum
          values:
            - Novice
            - Apprenti
            - Entraîné
            - Vétéran
            - Maître de guerre
        - id: physical_strength
          label: Force brute
          type: enum
          values:
            - Chétif
            - Faible
            - Ordinaire
            - Puissant
            - Titanesque
        - id: agility
          label: Agilité
          type: enum
          values:
            - Maladroit
            - Lourd
            - Normal
            - Agile
            - Foudroyant
        - id: endurance
          label: Endurance
          type: enum
          values:
            - Éphémère
            - Faible
            - Moyenne
            - Inépuisable
            - Surhumaine
        - id: reaction_speed
          label: Temps de réaction
          type: enum
          values:
            - Mou
            - Lent
            - Standard
            - Rapide
            - Instantané
        - id: dexterity
          label: Dextérité
          type: enum
          values:
            - Maladroit
            - Peu précis
            - Correct
            - Précis
            - Chirurgical
        - id: flexibility
          label: Souplesse
          type: enum
          values:
            - Raide
            - Rigide
            - Moyenne
            - Élastique
            - Contorsionniste
        - id: fighting_style
          label: Style de combat
          type: string
          source: style_fight_list
        - id: weapon_mastery
          label: Maîtrise des armes
          type: list
          source: ~object
        - id: fighting_techniques
          label: Techniques de combat
          type: list
          source: fightmoves_list
        - id: notes
          label: Notes
          type: textarea

    - id: magical_skills
      label: 🔮 Aptitudes Magiques
      properties:
        - id: magic_affinity
          label: Affinité magique
          type: enum
          values:
            - Inerte
            - Latente
            - Naturelle
            - Élevée
            - Absolue
        - id: mana_pool
          label: Réserve de mana
          type: enum
          values:
            - Infime
            - Modeste
            - Conséquente
            - Colossale
            - Inépuisable
        - id: spellcasting_speed
          label: Vitesse d’incantation
          type: enum
          values:
            - Lente
            - Standard
            - Rapide
            - Instantanée
            - Hors du temps
        - id: magic_control
          label: Contrôle magique
          type: enum
          values:
            - Chaotique
            - Instable
            - Correct
            - Maîtrisé
            - Parfait
        - id: elemental_mastery
          label: Maîtrise élémentaire
          type: enum
          values:
            - Nulle
            - Basique
            - Confirmée
            - Avancée
            - Ultime
        - id: arcane_knowledge
          label: Connaissances arcaniques
          type: enum
          values:
            - Ignorant
            - Initié
            - Savant
            - Erudit
            - Archimage
        - id: magic_resistance
          label: Résistance à la magie
          type: enum
          values:
            - Vulnérable
            - Faible
            - Moyenne
            - Robuste
            - Immuable
        - id: magical_senses
          label: Perception magique
          type: enum
          values:
            - Aucune
            - Faible
            - Développée
            - Affûtée
            - Omnisciente
        - id: magic_type
          label: Type de magie
          type: list
          source: ~magic
        - id: spells
          label: Sorts
          type: list
          source: ~spell
        - id: notes
          label: Notes
          type: textarea
          
    - id: preferences
      label: 🍹 Préférences
      properties:
        - id: sexualité
          label: Sexualité
          type: string
          source: sexuality_list
        - id: trait_dattirance
          label: Trait d'attirance
          type: string
          source: attraction_traits_list
        - id: passion
          label: Passion
          type: string
          source: passion_list
        - id: couleur_preferée
          label: Couleur préférée
          type: string
          source: color_list
        - id: style_de_musique
          label: Style de musique
          type: string
          source: music_style_list
        - id: boisson_favorite
          label: Boisson favorite
          type: string
          source: favorite_drinks_list
        - id: regime_alimentaire
          label: Régime alimentaire
          type: string
          source: diet_list
        - id: animal_totem
          label: Animal totem
          type: string
          source: animal_list
        - id: lieu_favori
          label: Lieu favori
          type: string
          source: favorite_place_list
        - id: objets_de_coeur
          label: Objets de cœur
          type: string
          source: heart_objects_list
        - id: condition_meteorologique_preferée
          label: Condition météorologique préférée
          type: string
          source: weather_condition_list
        - id: premiere_chose_faite_le_matin
          label: Première chose faite le matin
          type: string
          source: morning_activity_list
        - id: gene_ou_desagrement
          label: Gêne / désagrément
          type: string
          source: discomfort_list
        - id: meilleure_mort
          label: Meilleure mort
          type: string
          source: death_preference_list
        - id: peur_de_la_mort
          label: Peur de la mort
          type: string
          source: fear_of_death_list
        - id: phobie
          label: Phobie
          type: string
          source: phobia_list
        - id: notes
          label: Notes
          type: textarea