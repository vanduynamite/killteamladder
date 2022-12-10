# README

## Creating a new ladder
_All examples are using the ladder "aeronautica"_

### Backend
1. Add a ladder record:
```
  Ladder.create!(name: '/aeronautica')
```

2. Add a season record:
```
  Season.create!(season: 1, ladder_name: '/aeronautica')
```

3. Add factions to the Factions table:
```
  Faction.create!(faction_name: 'Imperial Navy', ladder_name: '/aeronautica')
  Faction.create!(faction_name: 'Imperial Guard', ladder_name: '/aeronautica')
  ...etc...
```

4. Add the ladder's logo to app/assets/images

5. Add a link to the logo in app/views/static_pages/root.html.erb:
```
  window.aeronautica_logo = "<%= image_url('aeronautica-logo.png') %>"
```

### Frontend
1. Add ladder name to frontend/components/app.jsx:
```
  <Route path='/aeronautica' component={ Ladder } />
```


2. Add ladder to frontend/components/nav/nav.jsx:
```
  case '/aeronautica':
    return (
      <Link to='/aeronautica/'>
        <img src={ window.aeronautica_logo } id='logo' />
      </Link>
    );
```

3. Add ladder to frontend/components/portal/portal.jsx:
```
  <h2>Aeronautica Ladder</h2>
  <Link to='/aeronautica/'>
    <img src={ window.aeronautica_logo } id='logo' />
  </Link>
```

4. If you want to use the blood spatter background, add the ladder to frontend/components/general/background.jsx:
```
  const laddersToUseBloodspatter = [
    '/killteam',
    '/40k',
    '/aeronautica',
  ];
```