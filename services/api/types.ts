export type MakeATripChatSuggestionsResponse = {
  count: number;
  last_updated: string; // ISO 8601 timestamp
  suggestions: string[];
};
export type Category = {
  id: number;
  category_name: string;
  icon: string | null;
};
export type GetCategoryApiResponce = Category[];
