# Internationalization library

Public API: `locales`, `Locale`, `isLocale`, and `dictionaries` through `index.ts`. The library owns EN/RU selection and interface JSON only. It is client-safe and has no framework request or cookie dependency.

Article metadata belongs to `entity/article`; home editorial copy belongs to `pages/home`. Translation files stay beside the corresponding owner. The `switch-language` feature owns navigation between localized documents. Both locales are statically generated; adding a locale requires complete translations and a build/export check.
