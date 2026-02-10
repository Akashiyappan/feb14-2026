import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('typewriter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ]),
    trigger('heartBeat', [
      state('beat', style({ transform: 'scale(1)' })),
      transition('* => beat', [
        animate('0.5s', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.3)', offset: 0.3 }),
          style({ transform: 'scale(1)', offset: 0.5 }),
          style({ transform: 'scale(1.2)', offset: 0.7 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class App implements OnInit, OnDestroy {
  // Love message with typewriter effect
  protected fullMessage = "My Dearest Love,\n\nEvery moment with you feels like a beautiful dream I never want to wake up from. You are the sunshine that brightens my darkest days, the laughter that fills my heart with joy, and the love that makes every day worth living.\n\nYour smile is my favorite sight, your voice is my favorite sound, and your happiness is my favorite feeling. I am so grateful for every second we spend together, every memory we create, and every tomorrow we'll share.\n\nYou are not just my girlfriend, you are my best friend, my confidant, and my soulmate. Thank you for being you, for loving me, and for making my world infinitely better just by being in it.\n\nForever yours,\nWith all my love ❤️";
  protected displayedMessage = signal('');
  protected messageIndex = 0;
  protected typingInterval: any;

  // Time Together Counter
  protected years = signal(0);
  protected months = signal(0);
  protected days = signal(0);
  protected hours = signal(0);
  protected countdownInterval: any;
  protected loveStartDate = new Date('2020-06-15T00:00:00');

  // Memories gallery
  protected memories = [
    { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400', caption: 'Our First Date' },
    { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400', caption: 'Perfect Moments' },
    { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400', caption: 'Together Forever' },
    { url: 'https://images.unsplash.com/photo-1522673607217-4cc91e35621e?w=400', caption: 'Beautiful Memories' },
    { url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400', caption: 'Adventures Together' },
    { url: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=400', caption: 'Endless Love' }
  ];

  // Surprise feature
  protected showSurprise = signal(false);
  protected hearts: Array<{ left: string; delay: string; duration: string }> = [];
  protected heartBeatState = 'normal';

  ngOnInit() {
    this.startTypewriter();
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startTypewriter() {
    this.typingInterval = setInterval(() => {
      if (this.messageIndex < this.fullMessage.length) {
        this.displayedMessage.set(this.fullMessage.substring(0, this.messageIndex + 1));
        this.messageIndex++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 30); // Speed of typing (30ms per character)
  }

  private startCountdown() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private updateCountdown() {
    const now = new Date();
    const start = this.loveStartDate;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();

    // Adjust for negative values
    if (hours < 0) {
      hours += 24;
      days--;
    }

    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    this.years.set(years);
    this.months.set(months);
    this.days.set(days);
    this.hours.set(hours);
  }

  protected revealSurprise() {
    this.showSurprise.set(true);
    this.heartBeatState = 'beat';
    this.createFloatingHearts();

    // Reset heart beat animation
    setTimeout(() => {
      this.heartBeatState = 'normal';
    }, 500);
  }

  private createFloatingHearts() {
    this.hearts = [];
    for (let i = 0; i < 30; i++) {
      this.hearts.push({
        left: Math.random() * 100 + '%',
        delay: Math.random() * 2 + 's',
        duration: (Math.random() * 3 + 3) + 's'
      });
    }
  }

  protected closeSurprise() {
    this.showSurprise.set(false);
    this.hearts = [];
  }
}
