# GitHub Copilot Agent Instructions - IMPROVED

## Tech Stack

- React Native with Expo (SDK 50+)
- TypeScript 5.0+
- Expo Router v3 for file-based navigation
- Zustand 4.x for state management
- TanStack Query v5 for data fetching and caching
  - Organized query hooks by feature
  - Proper caching and invalidation strategies
  - Global error handling setup
  - Optimistic updates implementation
- React Native Skia for drawing/animation
- AsyncStorage for local persistence
- React Native StyleSheet for styling
- EAS Build and EAS Update for deployment
- **NEW**: Expo Dev Client for enhanced development workflow
- **NEW**: React Native Reanimated 3.x for fluid animations
- **NEW**: mmkv for high-performance storage
- **NEW**: Maestro for E2E testing
- **NEW**: Sentry for error tracking and monitoring

## Project Structure

### Root Directory Structure

```
{project-name}/            # The name changes according to your project
├── app/                      # Expo Router-based navigation
│   ├── _layout.tsx           # Root layout
│   ├── index.tsx             # Home screen route
│   ├── (auth)/               # Auth group routes
│   │   ├── _layout.tsx       # Auth layout
│   │   ├── login.tsx         # Login screen
│   │   └── register.tsx      # Register screen
│   ├── (tabs)/               # Main app tabs
│   │   ├── _layout.tsx       # Tabs layout
│   │   ├── home/             # Home tab directory
│   │   │   └── index.tsx     # Home tab main screen
│   │   ├── profile/          # Profile tab directory
│   │   │   └── index.tsx     # Profile tab main screen
│   │   └── settings/         # Settings tab directory
│   │       └── index.tsx     # Settings tab main screen
│   └── +not-found.tsx        # 404 error handling
├── components/               # Reusable UI components
│   ├── common/               # Global reusable components used in 2+ places
│   │   ├── Button.tsx        # Reusable button component
│   │   └── Card.tsx          # Reusable card component
│   ├── screens/              # Screen-specific components
│   │   ├── home/             # Home screen specific components
│   │   │   ├── Header.tsx    # Home screen header
│   │   │   ├── Footer.tsx    # Home screen footer
│   │   │   └── CategoryItem.tsx  # Component used only in home screen
│   │   ├── profile/          # Profile screen specific components
│   │   └── settings/         # Settings screen specific components
├── hooks/                    # Custom hooks
│   ├── useAuth.ts            # Authentication hook
│   └── useTheme.ts           # Theme hook
├── store/                    # Zustand stores
│   ├── auth.ts               # Auth store
│   └── settings.ts           # Settings store
├── services/                 # API and external services
│   ├── api.ts                # API client setup
│   └── endpoints/            # API endpoints
│       ├── auth.ts           # Auth endpoints
│       └── users.ts          # User endpoints
├── utils/                    # Helper functions
│   ├── formatters.ts         # Data formatting utilities
│   └── validation.ts         # Validation utilities
├── constants/                # App constants
│   ├── theme.ts              # Theme constants
│   └── config.ts             # App configuration
├── assets/                   # Static assets
│   ├── images/               # Image assets
│   └── fonts/                # Font assets
├── types/                    # TypeScript type definitions
│   ├── api.types.ts          # All API related types
│   └── screen.types.ts       # All Screen related types
├── __tests__/               # Jest test files
├── e2e/                     # Maestro E2E test files
├── app.json                 # Expo app configuration
├── babel.config.js          # Babel configuration
├── tsconfig.json            # TypeScript configuration
└── **NEW**: metro.config.js # Metro bundler configuration
```

### Component Organization Rules

- **Screen-Specific Components**:

  - Place in `components/screens/[screen-name]/` directory
  - Only used by a single screen/feature
  - Example: `components/screens/home/Header.tsx`

- **Nested Components Rule**:

  - If a component is used only within one parent component:
    - Place in same directory as parent: `components/screens/home/CategoryItem.tsx`
  - If used in 2+ places:
    - Place in `components/common/` directory: `components/common/Button.tsx`

- **Component Subdirectories**:

  - For complex features with many components, create subdirectories:
    ```
    components/
    ├── screens/
    │   └── home/
    │       ├── carousel/            # Subdirectory for related components
    │       │   ├── CarouselItem.tsx
    │       │   └── CarouselControls.tsx
    │       └── Header.tsx
    ```

- **Business Logic Components**:

  - Group components by business domain rather than UI type
  - Example: Authentication components in `components/screens/auth/`

- **Screen Component Structure**:

  - Main screen components go in Expo Router app/ directory
  - Screen-specific UI components go in components/screens/[screen-name]/ directory
  - Example:

    ```
    app/
    └── (tabs)/
        └── home/
            └── index.tsx       # Main screen component using Expo Router

    components/
    └── screens/
        └── home/
            ├── Header.tsx     # Screen-specific components used by home screen
            └── CategoryList.tsx
    ```

- **NEW**: **Atomic Design Approach**:
  - Consider organizing UI components by atomic design principles:
    ```
    components/
    ├── atoms/             # Smallest building blocks (buttons, inputs)
    ├── molecules/         # Simple combinations of atoms (search bars)
    ├── organisms/         # Complex UI sections (forms, headers)
    └── templates/         # Page layouts and structures
    ```

## Component Templates

### Basic Component Structure

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonProps } from '@/types/components/common/button.types'; // NEW: Imported from types

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button" // NEW: Added accessibility role
      accessibilityLabel={title} // NEW: Added accessibility label
      accessibilityState={{ disabled }}>
      {' '}
      // NEW: Added accessibility state
      <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B82F6', // blue-500
  },
  secondaryButton: {
    backgroundColor: '#D1D5DB', // gray-300
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1F2937', // gray-800
  },
});
```

### Zustand Store Template

```tsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv'; // NEW: Using MMKV for better performance
import { AuthState, Credentials, User } from '@/types/store/auth.types'; // NEW: Imported from types
import { authService } from '@/services/endpoints/auth'; // NEW: Import service

// NEW: MMKV storage implementation
const storage = new MMKV();
const mmkvStorage: StateStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // API call implementation
          const { token, user } = await authService.login(credentials);
          set({ token, user, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },
      logout: () => {
        set({ token: null, user: null });
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage), // NEW: Using mmkvStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // NEW: Only persist necessary fields
    }
  )
);
```

## Development Workflow

### Monorepo Structure (if applicable)

- **NEW**: Use Turborepo instead of Yarn/npm Workspaces for more advanced monorepo features
- Maintain shared configurations in root directory
- Handle dependencies efficiently with proper hoisting
- Share code between packages with proper import paths
- **NEW**: Implement changeset for better monorepo versioning

### Development Environment

- Use consistent editor configurations with `.vscode/settings.json`
- Maintain `.editorconfig` for cross-editor consistency
- Required VS Code extensions:
  - ESLint
  - Prettier
  - React Native Tools
  - **NEW**: Error Lens for inline error highlighting
  - **NEW**: GitLens for better git integration
  - **NEW**: Import Cost to monitor bundle size
- Document development setup process in `CONTRIBUTING.md`
- **NEW**: Add `.nvmrc` file to enforce consistent Node.js version

### Expo Configuration

- Maintain clean and organized `app.json`/`app.config.js`
- Use environment variables with `@expo/config-plugins`
- Configure proper splash screen and app icon
- Set up proper permissions with explanation comments
- **NEW**: Use dynamic config to handle different environments
- **NEW**: Properly set up native modules using config plugins

### Environment Configuration

- Use environment variables with `@env` package
- Create separate config files for dev/staging/prod
- Never hard-code sensitive values
- Document all environment variables in `.env.example`
- **NEW**: Implement runtime configuration switching
- **NEW**: Add environment validation on app startup

### Ecosystem Management

- Weekly dependency updates strategy with `npm-check-updates`
- Security vulnerability monitoring with `npm audit`
- Compatibility checking process for Expo SDK updates
- Migration planning for major updates with team reviews
- **NEW**: Set up Renovate or Dependabot for automated dependency updates
- **NEW**: Create migration guides for major dependency changes

## Architecture Principles

### State Management

- Use Zustand for client-side state management

  - Split stores into feature-based slices (auth, settings, etc.)
  - Avoid mixing unrelated concerns in a single store
  - Use for UI state, app settings, and other client-side data
  - Implement proper TypeScript typing
  - Use middleware for persistence, devtools, immer
  - **NEW**: Implement slice pattern for better organization
  - **NEW**: Create custom Zustand middleware for logging and analytics

- Use TanStack Query for server state
  - Handle all API data fetching, caching, and updates
  - Implement optimistic updates for better UX
  - Configure proper invalidation and refetch strategies
  - Set up proper retry and error handling
  - Use query keys consistently
  - **NEW**: Implement custom query hooks for reusability
  - **NEW**: Set up global error handling for queries

### Performance Monitoring & Optimization

- Development Tools Integration
  - Use Flipper for debugging and monitoring
  - Implement Reactotron for state and API debugging
  - Monitor memory usage and render cycles
  - Track network requests and response times
  - Use React DevTools for component hierarchy analysis
  - **NEW**: Set up Sentry for real-time error tracking
  - **NEW**: Implement Firebase Performance Monitoring

### Performance Optimization

- React Native Specific

  - Use `useNativeDriver: true` for animations where possible
  - Implement proper `shouldComponentUpdate` or use `React.memo`
  - Avoid unnecessary re-renders with proper dependency arrays
  - Use InteractionManager for heavy operations
  - Implement proper handling of keyboard events
  - Use RN's built-in optimizations like `VirtualizedList`
  - **NEW**: Use inline requires for conditional imports
  - **NEW**: Implement hermes engine optimizations

- Lists and Large Datasets

  - Use FlashList for optimal list performance
  - Avoid nesting VirtualizedLists in ScrollViews
  - Implement proper item memoization with `React.memo`
  - Use pagination or infinite scroll for large datasets
  - Optimize list item rendering with proper keys
  - **NEW**: Implement windowing for large datasets
  - **NEW**: Use skeleton loaders for better perceived performance

- Memoization Strategy

  - Use React.memo for expensive components
  - Implement useCallback for function props
  - Apply useMemo for expensive computations
  - Define styles outside component with StyleSheet.create
  - Use proper dependency arrays in useEffect
  - **NEW**: Create custom memoization hooks for complex scenarios
  - **NEW**: Implement proper deep comparison for objects

- Image Optimization

  - Use proper image resizing and compression
  - Implement lazy loading for images
  - Use React Native's fast image component or libraries
  - Implement proper caching strategies
  - Optimize assets during the build process
  - **NEW**: Use progressive loading for large images
  - **NEW**: Implement image placeholders and blur-up technique

- Lazy Loading

  - Utilize Expo Router's built-in code splitting
  - Lazy load non-critical components and screens
  - Implement proper loading states
  - Use Suspense for code-splitting
  - **NEW**: Dynamic imports for large modules
  - **NEW**: Implement progressive hydration patterns

- Animations
  - Use react-native-reanimated for complex animations
  - Utilize the native driver when possible
  - Avoid layout animations on the JS thread
  - Implement shared element transitions
  - Use Skia for complex drawing operations
  - **NEW**: Implement gesture handlers for fluid interactions
  - **NEW**: Use worklets for better animation performance

### Logging Strategy

- Log Levels

  - DEBUG: Detailed information for debugging
  - INFO: General operational information
  - WARN: Warning messages for potentially harmful situations
  - ERROR: Error events that might still allow the application to continue running
  - FATAL: Critical errors that prevent app functionality
  - **NEW**: METRIC: For performance and usage data

- Production Logging

  - Minimize log verbosity
  - Only allow ERROR and WARN levels
  - Never log sensitive information (PII, credentials)
  - Implement crash reporting with Sentry or similar
  - Group similar errors to avoid duplicates
  - **NEW**: Implement proper log sanitization
  - **NEW**: Set up log rotation and compression

- Development Logging
  - Enable verbose logging
  - Log render cycles and performance metrics
  - Track state changes and API calls
  - Use proper debugging tools for React Native
  - Implement custom loggers for specific features
  - **NEW**: Create visual logging tools for development
  - **NEW**: Set up component render tracking

### Error Handling

- Global Error Boundary

  - Implement error boundaries for all major routes
  - Provide user-friendly error messages
  - Add retry mechanisms where appropriate
  - Log errors to monitoring service
  - **NEW**: Create custom fallback UIs for different error types
  - **NEW**: Implement graceful degradation strategies

- API Error Handling

  - Implement proper error models
  - Handle network errors gracefully
  - Show appropriate user feedback
  - Implement retry logic for transient errors
  - Handle offline scenarios
  - **NEW**: Create standardized error response format
  - **NEW**: Implement circuit breaker pattern for API calls

- Form Validation
  - Implement client-side validation
  - Show clear error messages
  - Validate on submit and on blur
  - Handle backend validation errors
  - Provide visual feedback for validation state
  - **NEW**: Implement progressive validation
  - **NEW**: Create reusable validation hooks

## Code Style

- Components

  - Use functional components with hooks
  - Prefer useCallback and useMemo for optimization
  - Keep components small and focused (maximum 200 lines)
  - Implement proper error boundaries
  - Use proper prop typing with TypeScript
  - Avoid inline styles completely – always use StyleSheet.create
  - Use code splitting for larger components
  - Break complex components into smaller subcomponents
  - **NEW**: Implement component composition patterns
  - **NEW**: Use render props and HOCs sparingly

- TypeScript

  - All components must be typed with proper interfaces
  - Define props using interface or type
  - Use proper type imports
  - Avoid `any` type unless absolutely necessary
  - Document complex types
  - Use proper generics for reusable components
  - Set strict mode in tsconfig.json
  - Never define component interfaces in component files, use proper types directory
  - Move all screen-level interfaces to corresponding types file
  - **NEW**: Use discriminated unions for complex state
  - **NEW**: Implement proper typing for async functions

- Clean Code
  - Avoid anonymous functions in JSX
  - Use meaningful variable and function names
  - Follow ESLint and Prettier rules
  - Implement proper error handling
  - Write self-documenting code
  - Avoid comments for obvious code
  - Document complex logic
  - Use consistent naming conventions
  - **NEW**: Implement feature flags for gradual rollouts
  - **NEW**: Create code ownership documentation

## Testing Strategy

- Unit Testing

  - Use Jest for component and utility testing
  - Implement proper mocking for external dependencies
  - Test critical business logic thoroughly
  - Aim for 70%+ coverage for core functionality
  - Use React Native Testing Library for component tests
  - Test Zustand stores independently
  - **NEW**: Implement snapshot testing for UI components
  - **NEW**: Create custom testing utilities for common patterns

- E2E Testing

  - Use Maestro for E2E testing with Expo
  - Implement critical user flow tests
  - Run tests in CI/CD pipeline
  - Test on multiple device configurations
  - Focus on key user journeys
  - **NEW**: Implement visual regression testing
  - **NEW**: Set up device farm testing (with AWS Device Farm or similar)

- Test Organization
  - Group tests by feature
  - Keep test files close to implementation
  - Use descriptive test names
  - Implement proper setup and teardown
  - Use test fixtures for consistent data
  - **NEW**: Create test factory functions for complex objects
  - **NEW**: Implement proper test isolation

## State Management

### Multiple State Solutions

- React Context

  - Use for simple, global state
  - Theme management
  - Authentication state
  - User preferences
  - Provide proper TypeScript typing
  - **NEW**: Implement proper context composition
  - **NEW**: Create custom context hooks for better usability

- Zustand (Primary)

  - Complex application state
  - Feature-based stores
  - Persist middleware for local storage
  - TypeScript integration
  - Use middleware for additional functionality
  - **NEW**: Implement proper store composition
  - **NEW**: Create custom middleware for performance monitoring

- TanStack Query

  - Server state management
  - Cache management
  - Optimistic updates
  - Real-time synchronization
  - Proper prefetching strategies
  - **NEW**: Implement custom query cache invalidation
  - **NEW**: Create query prefetching strategies

- State Updates
  - Implement immutable updates
  - Use proper TypeScript types
  - Handle error states
  - Implement proper cleanup
  - Document state transitions
  - **NEW**: Use Immer for easier immutable updates
  - **NEW**: Implement proper state snapshots and time-travel debugging

### Zustand Best Practices

- Create separate stores for different features
- Implement proper TypeScript types
- Use middleware when needed (e.g., persist, devtools)
- Keep selectors memoized
- Implement proper cleanup
- Use proper typing for actions
- Document store organization
- **NEW**: Create domain-specific selectors
- **NEW**: Implement proper store initialization patterns

### TanStack Query Implementation

- Organize queries by feature

  ```tsx
  // services/queries/auth.ts
  export const useUserQuery = () => {
    return useQuery({
      queryKey: ['user'],
      queryFn: () => authService.getCurrentUser(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // services/queries/products.ts
  export const useProductsQuery = (filters: ProductFilters) => {
    return useQuery({
      queryKey: ['products', filters],
      queryFn: () => productService.getProducts(filters),
      keepPreviousData: true,
    });
  };
  ```

- Implement proper error handling
  ```tsx
  // Global error handler setup in QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Custom retry logic based on error type
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return false; // Don't retry 404 errors
          }
          return failureCount < 3; // Retry other errors up to 3 times
        },
        onError: (error) => {
          // Global error handling
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Handle authentication errors
            authStore.logout();
            router.replace('/login');
          }
        },
      },
    },
  });
  ```
- Use suspense mode when appropriate
  ```tsx
  // In main layout/entry point:
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<AppLoadingIndicator />}>
      <RootNavigator />
    </Suspense>
  </QueryClientProvider>
  ```
- Configure proper stale times and caching

  ```tsx
  // Different stale times for different data types
  const useUserPreferences = () =>
    useQuery({
      queryKey: ['preferences'],
      queryFn: fetchUserPreferences,
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
    });

  const useNotifications = () =>
    useQuery({
      queryKey: ['notifications'],
      queryFn: fetchNotifications,
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 60 * 1000, // Refetch every minute
    });
  ```

- Set up global query client configuration

  ```tsx
  // app/_layout.tsx
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { NetworkProvider } from '../context/NetworkContext';

  export default function RootLayout() {
    const [queryClient] = React.useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 60 * 1000, // 1 minute
              retry: 2,
              refetchOnWindowFocus: false,
              refetchOnReconnect: true,
            },
            mutations: {
              retry: 1,
            },
          },
        })
    );

    return (
      <NetworkProvider>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </NetworkProvider>
    );
  }
  ```

- Use prefetching for improved UX

  ```tsx
  // Pre-fetch data for next screens
  const prefetchUserDetails = (userId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUserDetails(userId),
    });
  };

  // In a list component:
  <TouchableOpacity
    onPress={() => router.navigate(`/user/${user.id}`)}
    onHoverIn={() => prefetchUserDetails(user.id)} // Web
    onPressIn={() => prefetchUserDetails(user.id)} // Mobile
  >
    <UserListItem user={user} />
  </TouchableOpacity>;
  ```

- Implement proper invalidation strategies

  ```tsx
  // After mutations, invalidate related queries
  const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: updateUserProfile,
      onSuccess: (data, variables) => {
        // Invalidate user data and any dependent queries
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['user-preferences'] });

        // Update specific queries with new data without refetching
        queryClient.setQueryData(['user', variables.id], (old) => ({
          ...old,
          ...data,
        }));
      },
    });
  };
  ```

- **NEW**: Create custom query hooks for reusability

  ```tsx
  // hooks/useInfiniteProducts.ts
  export function useInfiniteProducts(filters: ProductFilters) {
    return useInfiniteQuery({
      queryKey: ['products', 'infinite', filters],
      queryFn: ({ pageParam = 1 }) => productService.getProducts({ ...filters, page: pageParam }),
      getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined),
      getPreviousPageParam: (firstPage) =>
        firstPage.currentPage > 1 ? firstPage.currentPage - 1 : undefined,
    });
  }

  // Usage in component:
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts({
    category: 'electronics',
  });
  ```

- **NEW**: Set up optimistic updates for better UX

  ```tsx
  // Optimistic updates for immediate UI feedback
  const useToggleFavoriteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: toggleFavoriteProduct,
      onMutate: async (productId) => {
        // Cancel ongoing refetches for this product
        await queryClient.cancelQueries({ queryKey: ['product', productId] });

        // Snapshot the previous value
        const previousProduct = queryClient.getQueryData(['product', productId]);

        // Optimistically update the product
        queryClient.setQueryData(['product', productId], (old: Product) => ({
          ...old,
          isFavorite: !old.isFavorite,
        }));

        // Also update the product in the products list
        queryClient.setQueriesData({ queryKey: ['products'] }, (old: any) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              items: page.items.map((item: Product) =>
                item.id === productId ? { ...item, isFavorite: !item.isFavorite } : item
              ),
            })),
          };
        });

        // Return context with the snapshotted value
        return { previousProduct };
      },
      onError: (err, productId, context) => {
        // If the mutation fails, revert the optimistic update
        if (context?.previousProduct) {
          queryClient.setQueryData(['product', productId], context.previousProduct);
          // Also revert in the list
          queryClient.invalidateQueries({ queryKey: ['products'] });
        }
      },
      onSettled: (data, error, productId) => {
        // Always refetch after error or success to make sure our local data is correct
        queryClient.invalidateQueries({ queryKey: ['product', productId] });
      },
    });
  };
  ```

### API Structure

- All API functions in `src/api/`
- Use axios with proper interceptors
- Implement retry logic
- Handle offline scenarios
- Set up proper authentication
- Document API endpoints
- Type all API responses
- Use proper error models
- **NEW**: Implement proper request cancellation
- **NEW**: Create API response normalization utilities

## Navigation

### Expo Router Implementation

- Utilize file-based routing with Expo Router v3

  ```
  app/
  ├── _layout.tsx                # Root layout with theme and auth providers
  ├── index.tsx                  # Main entry point or redirect
  ├── (auth)/                    # Auth group (login, register)
  │   ├── _layout.tsx            # Auth layout with common styles
  │   ├── login.tsx              # Login screen
  │   └── register.tsx           # Register screen
  ├── (tabs)/                    # Main app tabs
  │   ├── _layout.tsx            # Tab navigator layout
  │   ├── home/                  # Home tab with nested screens
  │   │   ├── index.tsx          # Main home screen
  │   │   └── [categoryId].tsx   # Dynamic category detail screen
  │   ├── profile/               # Profile tab with nested screens
  │   │   ├── index.tsx          # Main profile screen
  │   │   └── edit.tsx           # Edit profile screen
  │   └── settings/              # Settings tab
  │       ├── index.tsx          # Main settings screen
  │       └── notifications.tsx  # Notification settings
  └── +not-found.tsx             # 404 error handling
  ```

- Implement proper layouts (`_layout.tsx`)

  ```tsx
  // app/_layout.tsx
  import { Slot } from 'expo-router';
  import { QueryClientProvider } from '@tanstack/react-query';
  import { ThemeProvider } from '@/context/ThemeContext';
  import { AuthProvider } from '@/context/AuthContext';
  import { queryClient } from '@/services/queryClient';

  export default function RootLayout() {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // app/(tabs)/_layout.tsx
  import { Tabs } from 'expo-router';
  import { useTheme } from '@/hooks/useTheme';
  import { HomeIcon, ProfileIcon, SettingsIcon } from '@/components/common/Icons';

  export default function TabsLayout() {
    const { theme } = useTheme();

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          }}
        />
      </Tabs>
    );
  }
  ```

- Handle deep linking

  ```tsx
  // app.json
  {
    "expo": {
      "scheme": "myapp",
      "web": {
        "bundler": "metro"
      },
      "plugins": [
        "expo-router"
      ],
      "ios": {
        "associatedDomains": ["applinks:myapp.com"]
      },
      "android": {
        "intentFilters": [
          {
            "action": "VIEW",
            "autoVerify": true,
            "data": [
              {
                "scheme": "https",
                "host": "*.myapp.com",
                "pathPrefix": "/"
              }
            ],
            "category": ["BROWSABLE", "DEFAULT"]
          }
        ]
      }
    }
  }

  // app/_layout.tsx
  import { useEffect } from 'react';
  import { Linking } from 'react-native';
  import { router } from 'expo-router';

  export default function RootLayout() {
    useEffect(() => {
      // Handle deep links
      const handleDeepLink = (event: { url: string }) => {
        const { path, queryParams } = parseDeepLink(event.url);
        if (path) {
          router.navigate({
            pathname: path,
            params: queryParams,
          });
        }
      };

      // Listen for deep links while the app is open
      const subscription = Linking.addEventListener('url', handleDeepLink);

      // Handle deep links that launched the app
      Linking.getInitialURL().then((url) => {
        if (url) {
          const { path, queryParams } = parseDeepLink(url);
          if (path) {
            router.navigate({
              pathname: path,
              params: queryParams,
            });
          }
        }
      });

      return () => subscription.remove();
    }, []);

    // ...rest of the component
  }
  ```

- Configure proper navigation types

  ```tsx
  // types/navigation/routes.types.ts
  export type AppRoutes = {
    // Auth routes
    '/login': undefined;
    '/register': { referral?: string };

    // Tab routes
    '/home': undefined;
    '/home/[categoryId]': { categoryId: string };
    '/profile': undefined;
    '/profile/edit': undefined;
    '/settings': undefined;
    '/settings/notifications': undefined;
  };

  // Custom typed navigation hook
  import { useRouter as useExpoRouter, usePathname } from 'expo-router';
  import { AppRoutes } from '@/types/navigation/routes.types';

  export function useRouter() {
    const router = useExpoRouter();

    function navigate<T extends keyof AppRoutes>(route: T, params?: AppRoutes[T]) {
      router.navigate({
        pathname: route as string,
        params: params as Record<string, string>,
      });
    }

    return {
      ...router,
      navigate,
    };
  }
  ```

- Implement proper transitions

  ```tsx
  // app/(tabs)/_layout.tsx
  import { Tabs } from 'expo-router';
  import { Platform } from 'react-native';

  export default function TabsLayout() {
    return (
      <Tabs
        screenOptions={{
          // Customize transitions based on platform
          animation: Platform.OS === 'ios' ? 'default' : 'fade',
          // For Android, use Material transitions
          ...(Platform.OS === 'android' && {
            headerStyleInterpolator: MaterialTopTabHeaderStyleInterpolator,
            cardStyleInterpolator: MaterialCardStyleInterpolator,
          }),
        }}>
        {/* Tabs configuration */}
      </Tabs>
    );
  }
  ```

- Handle navigation events

  ```tsx
  // app/(tabs)/home/index.tsx
  import { useRouter, useSegments, useNavigation } from 'expo-router';

  export default function HomeScreen() {
    const segments = useSegments();
    const navigation = useNavigation();

    useEffect(() => {
      // Log route changes
      analytics.logScreenView({
        screen_name: segments.join('/'),
        screen_class: 'HomeScreen',
      });

      // Handle focus events
      const unsubscribeFocus = navigation.addListener('focus', () => {
        // Refresh data when screen comes into focus
        refetch();
      });

      return () => {
        unsubscribeFocus();
      };
    }, [segments, navigation]);

    // Rest of the component
  }
  ```

- Protect routes with authentication guards

  ```tsx
  // app/_layout.tsx
  import { Redirect, Slot, useSegments, useRouter } from 'expo-router';
  import { useAuth } from '@/hooks/useAuth';

  // Define which routes require authentication
  const protectedRoutes = ['/profile', '/settings'];

  function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      const isProtectedRoute =
        segments.length > 0 &&
        protectedRoutes.some((route) => segments.join('/').startsWith(route));

      if (!isAuthenticated && isProtectedRoute) {
        // Redirect to login with return path
        router.replace({
          pathname: '/login',
          params: { returnTo: segments.join('/') },
        });
      } else if (isAuthenticated && segments[0] === '(auth)') {
        // Redirect authenticated users away from auth screens
        router.replace('/home');
      }
    }, [isAuthenticated, segments, loading]);

    if (loading) {
      return <LoadingScreen />;
    }

    return <>{children}</>;
  }

  export default function RootLayout() {
    return (
      <AuthProvider>
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </AuthProvider>
    );
  }
  ```

- Use proper navigation params typing

  ```tsx
  // app/(tabs)/home/[categoryId].tsx
  import { useLocalSearchParams } from 'expo-router';
  import { Text } from 'react-native';

  type CategoryParams = {
    categoryId: string;
    filter?: string;
  };

  export default function CategoryScreen() {
    const { categoryId, filter } = useLocalSearchParams<CategoryParams>();

    // Type safety for required params
    if (!categoryId) {
      return <Text>Category ID is required</Text>;
    }

    return (
      <View>
        <Text>Category: {categoryId}</Text>
        {filter && <Text>Filter: {filter}</Text>}
      </View>
    );
  }
  ```

- **NEW**: Implement route-based code splitting

  ```tsx
  // For web platforms with Expo Router
  import { lazy, Suspense } from 'react';
  import { Platform } from 'react-native';

  // Only use lazy loading on web platform
  const DetailComponent = Platform.select({
    web: lazy(() => import('@/components/screens/home/DetailComponent')),
    default: require('@/components/screens/home/DetailComponent').default,
  });

  export default function DetailScreen() {
    return (
      <View>
        {Platform.OS === 'web' ? (
          <Suspense fallback={<LoadingIndicator />}>
            <DetailComponent />
          </Suspense>
        ) : (
          <DetailComponent />
        )}
      </View>
    );
  }
  ```

- **NEW**: Create route-based analytics tracking

  ```tsx
  // hooks/useRouteAnalytics.ts
  import { useEffect } from 'react';
  import { useSegments, usePathname } from 'expo-router';
  import { analytics } from '@/services/analytics';

  export function useRouteAnalytics() {
    const segments = useSegments();
    const pathname = usePathname();

    useEffect(() => {
      // Track screen views
      analytics.trackScreenView({
        screen_name: pathname,
        screen_class: segments[segments.length - 1] || 'HomeScreen',
      });

      // Track performance metrics
      const startTime = performance.now();

      return () => {
        // Track screen exit and time spent
        const duration = performance.now() - startTime;
        analytics.trackEvent('screen_exit', {
          screen: pathname,
          duration_ms: duration,
        });
      };
    }, [pathname, segments]);
  }

  // Usage in layout or individual screens
  // app/_layout.tsx
  export default function RootLayout() {
    useRouteAnalytics(); // Track all route changes

    return <Slot />;
  }
  ```

### Navigation Patterns

- Tab Navigation

  - Use bottom tabs for main navigation
  - Implement proper tab icons
  - Handle deep linking
  - Configure proper tab bar appearance
  - **NEW**: Implement custom tab animations
  - **NEW**: Create contextual tab indicators

- Stack Navigation

  - Configure proper transitions
  - Implement proper header customization
  - Handle back button behavior
  - Implement modal presentations
  - **NEW**: Create shared element transitions
  - **NEW**: Implement custom navigation gestures

- Navigation Guards
  - Implement authentication guards
  - Handle route permissions
  - Implement proper redirection
  - Use query parameters for state
  - **NEW**: Create route-based permission system
  - **NEW**: Implement progressive authentication

## Styling

### React Native StyleSheet

- **Always** use StyleSheet.create for all styles, never inline styles
- Group related styles together in the StyleSheet
- Create reusable style components
- Use consistent naming conventions (e.g., containerStyle, textStyle, etc.)
- Implement proper style inheritance with style arrays
- Keep styles co-located with components but outside render function
- Use style arrays for dynamic styling: `[styles.base, condition && styles.special]`
- Extract common styles to shared files
- Define all dimensions and spacing using theme constants
- **NEW**: Create style composition utilities
- **NEW**: Implement responsive design system

### Theme Management

- Store theme definitions in `theme/` directory
- Define a theme interface with TypeScript
- Create a centralized color and sizing palette
- Implement dark/light mode with React Context
- Use theme constants consistently across the app
- Handle dynamic theme changes
- Support system theme preferences
- Create style factory functions for themed components
- **NEW**: Implement design tokens system
- **NEW**: Create theme transition animations

## Persistence

### Data Storage

- Use AsyncStorage for simple data
- Implement proper error handling
- Clear sensitive data appropriately
- Handle migration scenarios
- Use proper storage keys
- Implement proper cleanup
- **NEW**: Use MMKV for performance-critical storage
- **NEW**: Implement proper data encryption for sensitive information

### State Persistence

- Use zustand/persist for state persistence
- Configure proper hydration
- Handle migration scenarios
- Implement proper storage serialization
- Handle storage errors
- Document persisted state
- Implement proper cleanup
- **NEW**: Create versioned persistence
- **NEW**: Implement selective persistence

## Performance Goals

### Startup Time

- Optimize initial bundle size
- Implement proper splash screen
- Minimize JS bundle size
- Use proper asset optimization
- Implement code splitting
- Optimize font loading
- Use proper image optimization
- **NEW**: Implement progressive bootstrapping
- **NEW**: Create optimized module loading strategy

### Runtime Performance

- Monitor and optimize re-renders
- Use React DevTools Profiler
- Implement proper list virtualization
- Use performance monitoring tools
- Profile regularly
- Optimize animations
- Minimize JavaScript bridge usage
- Use Hermes engine
- **NEW**: Implement native modules for performance-critical features
- **NEW**: Create custom FPS monitoring

### Memory Management

- Implement proper cleanup for components
- Handle large data sets efficiently
- Use proper memory profiling
- Implement proper image caching
- Clean up event listeners
- Use proper garbage collection patterns
- **NEW**: Implement memory leak detection
- **NEW**: Create memory budget management

## Accessibility

### Implementation

- Use proper semantic elements
- Implement proper focus management
- Test with screen readers (VoiceOver/TalkBack)
- Follow WCAG guidelines
- Use proper color contrast
- Implement proper keyboard navigation
- Use proper input labels
- Test with different font sizes
- Support dynamic type (iOS)
- **NEW**: Create accessibility test suite
- **NEW**: Implement proper screen reader announcements

## CI/CD Pipeline

### GitHub Actions Configuration

- Automated Workflows

  - Pull request validation
  - Type checking
  - Unit tests
  - E2E tests
  - Lint checks
  - Bundle size monitoring
  - Dependency validation
  - **NEW**: Performance regression testing
  - **NEW**: Accessibility compliance checks

- EAS Integration

  - Build automation
  - Update channels
  - Preview builds
  - Production deployments
  - Build caching
  - Environment variable management
  - **NEW**: Implement staged rollouts
  - **NEW**: Create automated changelogs

- Security
  - Secret management
  - Dependency scanning
  - Code scanning
  - Container scanning
  - License compliance
  - **NEW**: Implement SAST/DAST scanning
  - **NEW**: Create security compliance reporting

### Build Configuration

- EAS Build

  - Development builds
  - Preview builds
  - Production builds
  - Custom build profiles
  - Build hooks
  - Environment variable handling
  - **NEW**: Create custom EAS plugins
  - **NEW**: Implement build caching strategies

- Build Optimization
  - Asset optimization
  - Bundle size reduction
  - Platform-specific optimizations
  - Native module linking
  - Tree shaking
  - Code splitting
  - **NEW**: Implement dead code elimination
  - **NEW**: Create build metrics tracking

## Code Quality Tools

### ESLint Configuration

- Follow project-specific rules
- Use TypeScript-aware rules
- Implement React Native specific rules
- Configure auto-fixing
- Use proper ignore patterns
- Integrate with CI/CD
- **NEW**: Create custom ESLint rules for project-specific patterns
- **NEW**: Implement strict mode rules

### Prettier

- Use consistent formatting
- Configure editor integration
- Run in pre-commit hooks
- Use proper ignore patterns
- Configure with ESLint
- **NEW**: Implement proper exclusion patterns
- **NEW**: Create custom formatter plugins if needed

### Husky & lint-staged

- Configure pre-commit hooks
- Run linting before commits
- Run type checking before push
- Format code automatically
- Validate commit messages
- **NEW**: Implement commit message linting with commitlint
- **NEW**: Create custom pre-push validations

## Project Documentation

### Required Documentation

- Setup instructions
- Architecture decisions
- API documentation
- State management patterns
- Testing strategies
- Deployment procedures
- Troubleshooting guides
- Environment configuration
- Contribution guidelines
- **NEW**: Component library documentation
- **NEW**: Performance optimization guidelines

### Code Documentation

- TypeScript interfaces
- Component props
- Complex algorithms
- State management
- API integration
- Security considerations
- Performance optimizations
- Accessibility implementations
- **NEW**: Create architectural decision records (ADRs)
- **NEW**: Implement automated documentation generation

## Security Best Practices

- Secure Storage

  - Use secure storage for sensitive data
  - Implement proper encryption
  - Clear sensitive data on logout
  - Never store credentials in plain text
  - **NEW**: Use keychain/keystore for credentials
  - **NEW**: Implement proper key rotation

- API Security

  - Implement proper authentication
  - Use HTTPS for all requests
  - Handle token refresh
  - Validate user input
  - Implement rate limiting
  - **NEW**: Implement certificate pinning
  - **NEW**: Create proper CSRF protection

- Code Security
  - Avoid using eval()
  - Sanitize user input
  - Use proper dependency management
  - Implement proper error handling
  - Use proper permissions
  - **NEW**: Create security code scanning
  - **NEW**: Implement proper content security policy

## Internationalization

- Use i18n library compatible with React Native
- Implement proper locale detection
- Handle translations for all user-facing strings
- Support RTL languages
- Handle pluralization and formatting
- Localize dates and numbers
- Document translation workflow
- **NEW**: Implement dynamic locale loading
- **NEW**: Create translation management system

## Offline Support

- Implement proper offline detection
- Cache critical data
- Queue operations for offline use
- Implement proper synchronization
- Provide user feedback for offline state
- Handle reconnection scenarios
- Test offline functionality
- **NEW**: Create conflict resolution strategies
- **NEW**: Implement background sync

## Types Organization

### Types Directory Structure

```
types/
├── screens/                  # Screen-specific types
│   ├── auth/                # Auth screen types
│   │   ├── login.types.ts   # Login screen types
│   │   └── register.types.ts# Register screen types
│   ├── home/                # Home screen types
│   │   └── index.types.ts   # Home screen types
│   └── profile/             # Profile screen types
│       └── index.types.ts   # Profile screen types
├── components/              # Component-specific types
│   ├── common/              # Common component types
│   │   ├── button.types.ts  # Button component types
│   │   └── card.types.ts    # Card component types
│   └── home/               # Home component types
│       └── header.types.ts  # Home header component types
├── api/                    # API-related types
│   ├── requests/           # API request types
│   │   └── auth.types.ts   # Auth request types
│   └── responses/          # API response types
│       └── auth.types.ts   # Auth response types
├── models/                 # Data model types
│   ├── user.types.ts      # User model types
│   └── common.types.ts    # Common model types
├── store/                 # Store-related types
│   ├── auth.types.ts     # Auth store types
│   └── settings.types.ts # Settings store types
├── navigation/           # Navigation-related types
│   └── routes.types.ts  # Route parameter types
└── **NEW**: hooks/       # Hook-related types
    └── useForm.types.ts # Form hook types
```

### Type Organization Rules

- **Screen Types**:

  - Place in `types/screens/[screen-name]/` directory
  - Include prop types, state types, and screen-specific interfaces
  - Example: `types/screens/auth/login.types.ts`
  - All component interfaces defined in screen files must be moved to corresponding types file
  - Keep screen component types focused and single-responsibility
  - **NEW**: Create route parameter types for each screen

- **Component Types**:

  - Place in `types/components/[component-group]/` directory
  - Include prop types, state types, and component-specific interfaces
  - Use same structure as components directory
  - Example: `types/components/common/button.types.ts`
  - **NEW**: Create composition types for component variations

- **API Types**:

  - Separate request and response types
  - Place in `types/api/requests/` and `types/api/responses/`
  - Group by API domain/feature
  - Include proper HTTP method typing
  - Example: `types/api/requests/auth.types.ts`
  - **NEW**: Create normalized API response types

- **Model Types**:

  - Place in `types/models/` directory
  - Include shared data structures and interfaces
  - Keep models focused and single-responsibility
  - Example: `types/models/user.types.ts`
  - **NEW**: Implement domain model types

- **Store Types**:

  - Place in `types/store/` directory
  - Include state interfaces and action types
  - Match Zustand store structure
  - Example: `types/store/auth.types.ts`
