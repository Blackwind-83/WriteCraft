---
concept:
  id: organization
  label: Organisation
  dirName: Organisations
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identification_status
      label: 🏷️ Identification
      properties:
        - id: organisation_type
          label: Type d’organisation
          type: list
          source: organisation_types_list
        - id: secrecy_level
          label: Niveau de secret
          type: enum
          values:
            - Public
            - Connu mais discret
            - Semi-secret
            - Strictement confidentiel
            - Inconnu du grand public
        - id: status
          label: Statut actuel
          type: enum
          values:
            - Actif
            - Dissous
            - En déclin
            - En reconstruction
            - Légendaire (n'existe plus mais reste influent)
        - id: leader
          label: Leader actuel
          type: string
          source: ~character
        - id: notable_members
          label: Membres notables
          type: list
          source: ~character
        - id: member_count
          label: Nombre de membres
          type: number
        - id: recruitment_method
          label: Mode de recrutement
          type: list
          source: recruitment_methods_list
        - id: notes
          label: Notes
          type: textarea

    - id: origine_histoire
      label: 📜 Origine & Histoire
      properties:
        - id: foundation_date
          label: Date de fondation
          type: string
        - id: founder
          label: Fondateurs
          type: list
          source: ~character
        - id: historical_events
          label: Événements marquants
          type: list
          source: ~event
        - id: conflicts_involved
          label: Conflits impliqués
          type: list
          source: ~event
        - id: evolution
          label: Évolution de l’organisation
          type: textarea
        - id: famous_figures
          label: Figures emblématiques
          type: list
          source: ~character
        - id: notes
          label: Notes
          type: textarea

    - id: objectifs_activites
      label: 🎯 Objectifs & Activités
      properties:
        - id: main_goal
          label: Objectif principal
          type: textarea
        - id: secondary_goals
          label: Objectifs secondaires
          type: list
        - id: methods
          label: Méthodes utilisées
          type: list
          source: methods_list
        - id: funding
          label: Moyens de financement
          type: list
          source: funding_sources_list
        - id: primary_activities
          label: Activités principales
          type: list
          source: activities_list
        - id: military_engagement
          label: Engagement militaire
          type: enum
          values:
            - Pacifiste
            - Défensif uniquement
            - Engagement modéré
            - Agressif
            - Militariste extrême
        - id: expertise_domains
          label: Domaines d’expertise
          type: list
          source: expertise_list
        - id: notes
          label: Notes
          type: textarea

    - id: structure_organisation
      label: 🏛️ Structure & Organisation
      properties:
        - id: decision_making
          label: Mode de prise de décision
          type: enum
          values:
            - Autoritaire
            - Démocratique
            - Consensus
            - Hiérarchique strict
            - Conseil dirigeant
            - Anarchique
            - Autre
        - id: internal_roles
          label: Rôles internes
          type: list
          source: internal_roles_list
        - id: leadership_selection
          label: Mode de désignation des dirigeants
          type: enum
          values:
            - Héritage familial
            - Élection
            - Duel ou épreuve
            - Vote du conseil
            - Désignation divine
            - Manipulation interne
            - Autre
        - id: communication_methods
          label: Modes de communication
          type: list
          source: communication_methods_list
        - id: training_methods
          label: Formation des membres
          type: list
          source: training_methods_list
        - id: autonomy_level
          label: Niveau d’autonomie des branches
          type: enum
          values:
            - Centralisé
            - Semi-autonome
            - Complètement autonome
        - id: hierarchy
          label: Hiérarchie et structure interne
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: relations_influence
      label: 🌍 Relations & Influence
      properties:
        - id: alliances
          label: Alliances
          type: list
          source: ~organisation
        - id: enemies
          label: Rivalités et ennemis
          type: list
          source: ~organisation
        - id: parent_organisation
          label: Organisation parente
          type: string
          source: ~organisation
        - id: subgroups
          label: Sous-groupes
          type: list
          source: ~organisation
        - id: influence_level
          label: Niveau d’influence globale
          type: enum
          values:
            - Locale
            - Régionale
            - Nationale
            - Continentale
            - Mondiale
            - Multi-plan
        - id: social_perception
          label: Popularité & Image publique
          type: enum
          values:
            - Adoré
            - Respecté
            - Toléré
            - Craint
            - Haï
            - Inconnu
        - id: notes
          label: Notes
          type: textarea

    - id: culture_symbols
      label: 🗿 Culture & Symboles
      properties:
        - id: symbols
          label: Symboles et emblèmes
          type: textarea
        - id: colors
          label: Couleurs et uniformes
          type: list
          source: colors_list
        - id: slogans
          label: Slogans et devises
          type: textarea
        - id: rituals
          label: Rituels et traditions
          type: textarea
        - id: fundamental_values
          label: Valeurs fondamentales
          type: textarea
        - id: art_forms
          label: Arts et artisanat développés
          type: list
          source: art_forms_list
        - id: notes
          label: Notes
          type: textarea

    - id: territoire_siege
      label: 🏰 Territoire & Siège
      properties:
        - id: headquarters
          label: Siège principal
          type: string
          source: ~place
        - id: controlled_territories
          label: Territoires contrôlés
          type: list
          source: ~place
        - id: infrastructure
          label: Infrastructures majeures
          type: list
          source: infrastructure_list
        - id: resources
          label: Ressources exploitées
          type: list
          source: ~Material
        - id: hidden_bases
          label: Bases secrètes
          type: list
          source: ~place
        - id: mobility
          label: Mobilité et expansion territoriale
          type: textarea
        - id: notes
          label: Notes
          type: textarea
---