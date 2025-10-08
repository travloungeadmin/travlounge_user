import { services } from '@/data';

export function getHomeServices(category: any) {
  if (!category) return [];
  return services.map((service) => {
    const matchedCategory = category.find(
      (cat: { category_name: string }) =>
        cat.category_name.toLowerCase().replace(/\s/g, '') ===
        service.title.toLowerCase().replace(/\s/g, '')
    );
    return {
      id: matchedCategory ? matchedCategory.id : null,
      ...service,
    };
  });
}
