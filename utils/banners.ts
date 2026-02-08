import { router } from 'expo-router';

export function handleBannerNavigation(banner: Banner) {
  switch (banner.type) {
    case 'elite_wallet':
      router.push('/elite-card/wallet');
      break;

    case 'listing':
      if (banner.category_id && banner.category_name) {
        router.push({
          pathname: '/listings/[id]',
          params: {
            id: banner.category_id,
            name: banner.category_name,
          },
        });
      }
      break;

    case 'listing_detail':
      if (banner.listing_id && banner.listing_name) {
        router.push({
          pathname: '/listings/listing-details',
          params: {
            id: banner.listing_id,
            name: banner.listing_name,
          },
        });
      }
      break;

    default:
      // exhaustive check (TypeScript safety)
      const _exhaustive: never = banner;
      return _exhaustive;
  }
}
