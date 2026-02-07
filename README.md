# jikants

<p align="center">
  <img src="https://raw.githubusercontent.com/jikan-me/jikan-rest/master/public/images/jikan.png" alt="jikants" width="200"/>
</p>

<p align="center">
  <strong>A modern TypeScript/JavaScript wrapper for the Jikan API v4</strong>
</p>

<p align="center">

  ![Language Shield](https://img.shields.io/badge/language-typescript-blue?style=for-the-badge)
  ![GitHub License](https://img.shields.io/github/license/rushelasli/jikants?style=for-the-badge&color=blueviolet)
  ![Code Style Shield](https://img.shields.io/badge/code%20style-Biome-60A5FA?style=for-the-badge&logo=biome)
  ![NPM Version](https://img.shields.io/npm/v/%40rushelasli%2Fjikants?style=for-the-badge&logo=npm)
  ![NPM Downloads](https://img.shields.io/npm/dt/%40rushelasli%2Fjikants?style=for-the-badge&color=red&logo=npm)
  ![Bundle Size](https://img.shields.io/bundlephobia/minzip/%40rushelasli%2Fjikants?style=for-the-badge&color=darkgreen)

</p>

> Jikan API wrapper for TypeScript and Node.js with built-in typing and caching.

## Features

- 💅 **Fully typed** - Complete TypeScript definitions for all endpoints
- ♻ **HTTP Request Cache** - Automatic 24-hour response caching
- 📄 **Logging** - Optional request/response logging
- 📦 **ESM with tree shaking support** - Lightweight and modern
- 🎯 **Intuitive API** - Clean interface with method chaining
- ✅ **Well tested** - Comprehensive test coverage

## Installation

```bash
npm install --save @rushelasli/jikants axios axios-cache-interceptor
# or
yarn add @rushelasli/jikants axios axios-cache-interceptor
# or
pnpm add @rushelasli/jikants axios axios-cache-interceptor
# or
bun add @rushelasli/jikants axios axios-cache-interceptor
```

## Example

Using a specific client, like **AnimeClient**:

```ts
import { AnimeClient, JikanResponse, Anime } from '@rushelasli/jikants';

const animeClient = new AnimeClient();

animeClient
  .getAnimeById(1)
  .then((response: JikanResponse<Anime>) => {
    console.log(response.data.title); // "Cowboy Bebop"
  });
```

Or, using the **JikanClient**:

```ts
import { JikanClient, JikanResponse, Anime } from '@rushelasli/jikants';

const jikanClient = new JikanClient();

jikanClient.anime
  .getAnimeById(1)
  .then((response: JikanResponse<Anime>) => {
    console.log(response.data.title); // "Cowboy Bebop"
  });
```

## Client Configuration

### Cache Configuration

Jikants uses `axios-cache-interceptor` to store request results with a default 24-hour TTL.
To use a specific configuration, pass the `cacheOptions` argument when instantiating a client:

```ts
import { AnimeClient } from '@rushelasli/jikants';

const animeClient = new AnimeClient({
  cacheOptions: {
    ttl: 1000 * 60 * 30, // 30 minutes
    methods: ['get'],
    cacheTakeover: false
  }
});
```

### Custom Axios Instance

Jikants uses `axios` as an HTTP client and if you are not satisfied with the default client settings, then you can build your instance by passing it to the optional `axiosInstance` argument:

```ts
import { AnimeClient } from '@rushelasli/jikants';
import Axios from 'axios';

const animeClient = new AnimeClient({
  axiosInstance: Axios.create({
    timeout: 10000,
    headers: { 'User-Agent': 'MyApp/1.0.0' }
  })
});
```

For more information, check out the [axios-cache-interceptor Documentation](https://axios-cache-interceptor.js.org/).

### Logging

To enable logging, pass the `enableLogging` argument as `true`.

```ts
import { AnimeClient } from '@rushelasli/jikants';

const animeClient = new AnimeClient({
  enableLogging: true
});
```

## Available Clients

| Client                        | Status       | Endpoints |
|-------------------------------|--------------|-----------|
| **AnimeClient**               | ✅ Complete   | 21/21     |
| **MangaClient**               | ✅ Complete   | 14/14     |
| **CharactersClient**          | ✅ Complete   | 7/7       |
| **PeopleClient**              | ✅ Complete   | 6/6       |
| **ClubsClient**               | ✅ Complete   | 5/5       |
| **GenresClient**              | ✅ Complete   | 2/2       |
| **MagazinesClient**           | ✅ Complete   | 1/1       |
| **ProducersClient**           | ✅ Complete   | 3/3       |
| **RandomClient**              | ✅ Complete   | 5/5       |
| **RecommendationsClient**     | ✅ Complete   | 2/2       |
| **ReviewsClient**             | ✅ Complete   | 2/2       |
| **SchedulesClient**           | ✅ Complete   | 1/1       |
| **SeasonsClient**             | ✅ Complete   | 4/4       |
| **TopClient**                 | ✅ Complete   | 4/4       |
| **UsersClient**               | ✅ Complete   | 14/14     |
| **WatchClient**               | ✅ Complete   | 4/4       |
| **JikanClient** (Main client) | ✅ Complete   | -         |

**Overall Progress**: 101/101 endpoints (100%)

## Usage Examples

### Anime

```ts
import { JikanClient } from '@rushelasli/jikants';

const jikan = new JikanClient();

// Get complete anime data
const anime = await jikan.anime.getAnimeFullById(1);
console.log(anime.data.relations);
console.log(anime.data.theme.openings);

// Get anime characters
const characters = await jikan.anime.getAnimeCharacters(1);
characters.data.forEach(char => {
  console.log(char.character.name, char.role);
});

// Get anime episodes
const episodes = await jikan.anime.getAnimeEpisodes(1, 1);
console.log(episodes.pagination);

// Search anime with filters
const results = await jikan.anime.searchAnime({
  q: 'naruto',
  type: 'TV',
  status: 'complete',
  rating: 'pg13',
  order_by: 'score',
  sort: 'desc',
  min_score: 8,
  sfw: true
});
```

### Manga

```ts
import { JikanClient } from '@rushelasli/jikants';

const jikan = new JikanClient();

// Get manga data
const manga = await jikan.manga.getMangaById(1);
console.log(manga.data.title);

// Get manga characters
const characters = await jikan.manga.getMangaCharacters(1);

// Search manga
const results = await jikan.manga.searchManga({
  q: 'one piece',
  type: 'manga',
  status: 'publishing',
  order_by: 'score'
});
```

### Cache Management

```ts
const jikan = new JikanClient();

// Fetch data (will be cached for 24 hours)
await jikan.anime.getAnimeById(1);

// Clear all cache
await jikan.clearCache();

// Clear specific cache entry
await jikan.clearCacheEntry('/anime/1');

// Access axios instance for advanced usage
const axiosInstance = jikan.getAxiosInstance();
```

### Error Handling

```ts
try {
  const anime = await jikan.anime.getAnimeById(999999999);
} catch (error) {
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Error:', error.response.data);
  }
}
```

## TypeScript Support

Jikants is written in TypeScript with comprehensive type definitions:

```ts
import type { 
  Anime, 
  AnimeFull,
  AnimeSearchParams,
  Manga,
  MangaFull,
  JikanResponse
} from '@rushelasli/jikants';

// Fully typed responses
const { data }: JikanResponse<Anime> = await jikan.anime.getAnimeById(1);

// TypeScript autocomplete for search parameters
const params: AnimeSearchParams = {
  q: 'naruto',
  type: 'TV',
  status: 'complete',
  order_by: 'score',
  sort: 'desc'
};
```

## Rate Limiting

The Jikan API has the following rate limits:

| Duration | Requests |
|----------|----------|
| Per Second | **3 requests** |
| Per Minute | **60 requests** |
| Daily | **Unlimited** |

💡 **Tip**: Use the built-in cache to minimize API calls and stay within rate limits.

## Resources

- [Jikan API Documentation](https://docs.api.jikan.moe/)
- [Jikan Website](https://jikan.moe/)
- [MyAnimeList](https://myanimelist.net/)
- [GitHub Repository](https://github.com/rushelasli/jikants)
- [Report Issues](https://github.com/rushelasli/jikants/issues)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Rushel](https://github.com/rushelasli)

This project is not affiliated with MyAnimeList or Jikan.

## Disclaimer

This is an unofficial library. Please use the Jikan API responsibly and follow their [terms of use](https://jikan.moe/terms).

## Leave Your Feedback

- Did you find this project useful? [Leave a ⭐](https://github.com/rushelasli/jikants)
- Found a problem? [Create an issue 🔎](https://github.com/rushelasli/jikants/issues)
- Want to contribute? [Submit a PR 📑](https://github.com/rushelasli/jikants/pulls)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/rushelasli">Rushel</a>
</p>