---
concept:
  id: religion
  label: Religion
  dirName: Religions
  unknownImg: images/character-unknown.jpg
  categories:
    - id: religion_fundamentals
      label: 🏛️ Fondements & Nature
      properties:
        - id: deities
          label: Divinités vénérées
          type: list
          source: ~character
        - id: alignment
          label: Alignement
          type: enum
          values:
            - Bénéfique
            - Maléfique
            - Neutre
            - Variable selon les adeptes
        - id: philosophy
          label: Philosophie & Principes
          type: textarea
        - id: place_of_origin
          label: Lieu d'origine
          type: reference
          source: ~place
        - id: transmission_mode
          label: Mode de transmission
          type: enum
          values:
            - Oral
            - Écrit
            - Initiatique
            - Mixte
        - id: popularity
          label: Popularité & diffusion
          type: enum
          values:
            - Très répandue
            - Commune
            - Rare
            - Secrète
            - Interdite sous certaines conditions
        - id: notes
          label: Notes
          type: textarea

    - id: religion_organization
      label: ⛪ Organisation & Structure
      properties:
        - id: clergy
          label: Clergé & Hiérarchie
          type: textarea
        - id: followers_role
          label: Rôle des fidèles
          type: textarea
        - id: sects
          label: Sectes & Dissidences
          type: list
          source: ~religion
        - id: sacred_texts
          label: Textes sacrés
          type: textarea
        - id: main_worship_places
          label: Lieux de culte principaux
          type: list
          source: ~place
        - id: ceremonies
          label: Rites et cérémonies majeures
          type: textarea
        - id: religious_symbols
          label: Symboles religieux
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: religion_influence
      label: ⚔️ Influence & Impact
      properties:
        - id: cult_nature
          label: Nature du culte
          type: enum
          values:
            - Pacifiste
            - Conquérant
            - Prosélyte
            - Fermé aux étrangers
            - Variable
        - id: major_events
          label: Événements majeurs liés
          type: list
          source: ~event
        - id: miracles
          label: Miracles & phénomènes surnaturels
          type: textarea
        - id: relations_with_other_religions
          label: Relation avec d’autres religions
          type: list
          source: ~religion
        - id: sacred_relics
          label: Reliques sacrées
          type: list
          source: ~object
        - id: notes
          label: Notes
          type: textarea
---