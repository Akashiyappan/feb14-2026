# Valentine's Day Love Application

A beautiful, romantic Angular application created to express love and affection on Valentine's Day.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Features

This romantic single-page application includes:

1. **Landing Page** - Animated floating hearts background with a romantic greeting
2. **Love Letter** - Personalized message with smooth typewriter animation effect
3. **Memory Gallery** - Beautiful photo gallery with hover effects and smooth transitions
4. **Countdown Timer** - Real-time countdown to Valentine's Day 2026
5. **Surprise Button** - Interactive button that reveals a romantic message with floating hearts animation
6. **Responsive Design** - Optimized for both mobile and desktop viewing
7. **Smooth Animations** - Professional Angular animations throughout

## Technologies Used

- Angular 21+ (Standalone Components)
- TypeScript
- SCSS for styling
- Angular Animations
- Modern responsive design
- Google Fonts (Playfair Display & Raleway)

## Customization

### Personalizing the Love Letter

Edit the `fullMessage` property in `src/app/app.ts` (line 45) to customize the love letter:

```typescript
protected fullMessage = "Your personalized message here...";
```

### Changing the Countdown Date

Modify the `valentinesDay` date in `src/app/app.ts` (line 56):

```typescript
protected valentinesDay = new Date('2026-02-14T00:00:00');
```

### Updating Photos

Replace the Unsplash URLs in the `memories` array in `src/app/app.ts` (lines 59-66) with your own photos:

```typescript
protected memories = [
  { url: 'your-photo-url', caption: 'Your Caption' },
  // Add more photos...
];
```

### Customizing the Surprise Message

Edit the surprise modal content in `src/app/app.html` (lines 91-98).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
