---
concept:
  id: place
  label: Lieu
  dirName: Lieux
  unknownImg: images/character-unknown.jpg
  categories:
    - id: identification
      label: 🏷️ Identification
      properties:
        - id: type
          label: Type de lieu
          type: list
          source: place_types_list
        - id: appellations
          label: Autres noms / Appellations
          type: list
        - id: notoriety
          label: Notoriété
          type: enum
          values:
            - Caché / Oublié
            - Très peu connu
            - Peu connu
            - Connu localement
            - Connu régionalement
            - Célèbre
            - Très célèbre
            - Mythique / Légendaire
        - id: description
          label: Description
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: geography
      label: 🌍 Géographie & Caractéristiques
      properties:
        - id: size
          label: Taille / Étendue
          type: enum
          values:
            - Très petit
            - Petit
            - Moyen
            - Grand
            - Très grand
            - Incommensurable
        - id: terrain
          label: Type de terrain
          type: list
          source: terrain_types_list
        - id: climate
          label: Climat
          type: list
          source: climates_list
        - id: natural_resources
          label: Ressources naturelles
          type: list
          source: ~material
        - id: ecosystems
          label: Écosystèmes présents
          type: list
          source: ecosystems_list
        - id: fauna
          label: Faune notable
          type: list
          source: ~animal
        - id: flora
          label: Flore notable
          type: list
          source: ~plant
        - id: contained_in
          label: Fait partie de
          type: list
          source: ~place
        - id: contains_places
          label: Inclut les lieux
          type: list
          source: ~place
        - id: neighboring_places
          label: Lieux voisins
          type: list
          source: ~place
        - id: threats
          label: Menaces naturelles
          type: list
          source: natural_threats_list
        - id: notes
          label: Notes
          type: textarea

    - id: history
      label: 📜 Histoire & Origine
      properties:
        - id: origin
          label: Origine / Création
          type: textarea
        - id: historical_figures
          label: Figures historiques liées au lieu
          type: list
          source: ~character
        - id: past_civilizations
          label: Civilisations ayant occupé le lieu
          type: list
          source: ~organisation
        - id: past_races
          label: Races ayant occupé le lieu
          type: list
          source: ~race
        - id: key_events
          label: Événements marquants
          type: list
          source: ~event
        - id: past_conflicts
          label: Conflits impliqués
          type: list
          source: ~event
        - id: vestiges
          label: Vestiges du passé
          type: list
          source: ~place
        - id: relics
          label: Reliques du passé
          type: list
          source: ~object
        - id: cultural_significance
          label: Importance culturelle
          type: textarea
        - id: notes
          label: Notes
          type: textarea

    - id: culture
      label: 🎭 Culture & Influence
      properties:
        - id: myths_legends
          label: Mythes et légendes associés
          type: textarea
        - id: traditions
          label: Traditions et rituels
          type: textarea
        - id: famous_people
          label: Personnalités célèbres liées au lieu
          type: list
          source: ~character
        - id: symbols
          label: Symboles et drapeaux
          type: image
        - id: architectural_style
          label: Style architectural dominant
          type: list
          source: architectural_styles_list
        - id: major_events
          label: Événements majeurs actuels
          type: list
          source: ~event
        - id: economic_importance
          label: Importance économique
          type: textarea
        - id: tourism
          label: Attraction touristique ?
          type: enum
          values:
            - Aucune attraction
            - Peu touristique
            - Touristique
            - Très touristique
            - Lieu iconique
        - id: local_crafts
          label: Artisanat et productions locales
          type: list
          source: crafts_list
        - id: notes
          label: Notes
          type: textarea
---