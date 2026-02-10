# jikants

<p align="center">
  <strong>Modern TypeScript wrapper for the Jikan API v4</strong>
</p>

Full-featured Jikan API wrapper with TypeScript support, automatic caching, and 100% endpoint coverage.

## Features

- 💅 **Fully typed** - Complete TypeScript definitions
- ♻️ **Auto caching** - 24-hour response cache (configurable)
- 📦 **ESM + Tree shaking** - Lightweight and modern
- ✅ **100% coverage** - All 101 Jikan API v4 endpoints
- 🎯 **Clean API** - Intuitive method names

## Installation

```bash
npm install @rushelasli/jikants axios axios-cache-interceptor
```

## Quick Start

```ts
import { JikanClient } from '@rushelasli/jikants';

const jikan = new JikanClient();

// Get anime by ID
const anime = await jikan.anime.getAnimeById(1);
console.log(anime.data.title); // "Cowboy Bebop"

// Search anime
const results = await jikan.anime.searchAnime({
  q: 'naruto',
  type: 'TV',
  order
_by: 'score',
  sort: 'desc'
});

// Get seasonal anime
const seasonal = await jikan.seasons.getSeasonNow();

// Get top anime
const top = await jikan.top.getTopAnime({ limit: 10 });
```

## Available Clients

All 14 clients with full endpoint coverage:

```ts
jikan.anime          // 21 endpoints - Anime data, episodes, reviews, etc.
jikan.manga          // 14 endpoints - Manga data, characters, reviews, etc.
jikan.characters     // 7 endpoints  - Character info, appearances, pictures
jikan.people         // 6 endpoints  - Person info, roles, pictures
jikan.seasons        // 4 endpoints  - Seasonal anime, current, upcoming
jikan.schedules      // 1 endpoint   - Anime broadcast schedules
jikan.top            // 4 endpoints  - Top anime, manga, characters, people
jikan.genres         // 2 endpoints  - Anime/manga genres
jikan.producers      // 3 endpoints  - Producer/studio info
jikan.magazines      // 1 endpoint   - Magazine info
jikan.clubs          // 5 endpoints  - Club data, members, search
jikan.users          // 14 endpoints - User profiles, stats, favorites
jikan.recommendations // 2 endpoints - Recent recommendations
jikan.reviews        // 2 endpoints  - Recent reviews
jikan.random         // 5 endpoints  - Random content
jikan.watch          // 4 endpoints  - Watch promos/videos
```

## Configuration

### Custom Cache TTL

```ts
const jikan = new JikanClient({
  cacheOptions: {
    ttl: 1000 * 60 * 30, // 30 minutes
  }
});
```

### Custom Axios Instance

```ts
import Axios from 'axios';

const jikan = new JikanClient({
  axiosInstance: Axios.create({
    timeout: 10000,
    headers: { 'User-Agent': 'MyApp/1.0.0' }
  })
});
```

### Enable Logging

```ts
const jikan = new JikanClient({
  enableLogging: true
});
```

## Examples

### Search with Filters

```ts
const results = await jikan.anime.searchAnime({
  q: 'one piece',
  type: 'TV',
  status: 'airing',
  rating: 'pg13',
  min_score: 8,
  order_by: 'score',
  sort: 'desc',
  sfw: true,
  page: 1,
  limit: 25
});
```

### Get Character Details

```ts
const character = await jikan.characters.getCharactersFullById(1);
console.log(character.data.name);
console.log(character.data.anime); // Anime appearances
console.log(character.data.voices); // Voice actors
```

### Get User Profile

```ts
const user = await jikan.users.getUserProfile('username');
console.log(user.data.statistics);

const favorites = await jikan.users.getUserFavorites('username');
console.log(favorites.data.anime);
```

### Cache Management

```ts
// Clear all cache
await jikan.clearCache();

// Clear specific entry
await jikan.clearCacheEntry('/anime/1');
```

### Error Handling

```ts
try {
  const anime = await jikan.anime.getAnimeById(999999);
} catch (error) {
  console.error(error.response?.status); // 404
}
```

## TypeScript Support

Full type safety out of the box:

```ts
import type { 
  Anime, 
  Manga,
  Character,
  JikanResponse,
  AnimeSearchParams 
} from '@rushelasli/jikants';

const { data }: JikanResponse<Anime> = await jikan.anime.getAnimeById(1);
```

## Rate Limits

Jikan API limits: **3 requests/second**, **60 requests/minute**

The built-in cache helps you stay within limits automatically.

## Resources

- [Jikan API Docs](https://docs.api.jikan.moe/)
- [GitHub Repository](https://github.com/rushelasli/jikants)
- [Report Issues](https://github.com/rushelasli/jikants/issues)

## License

MIT © [Rushel](https://github.com/rushelasli)

---

**Not affiliated with MyAnimeList or Jikan. Use responsibly.**
