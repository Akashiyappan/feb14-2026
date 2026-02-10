import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {
  LOVE_MESSAGE,
  LOVE_START_DATE,
  LOVE_START_DATE_DISPLAY,
  MEMORIES,
  MAIN_TITLE,
  LANDING_SUBTITLE,
  SECTION_TITLES,
  SURPRISE_CONTENT,
  FOOTER_TEXT,
  TYPEWRITER_SPEED,
  SURPRISE_BUTTON_TEXT,
  SCROLL_INDICATOR_TEXT
} from './app.constants';

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
  // Expose constants for template
  protected readonly MAIN_TITLE = MAIN_TITLE;
  protected readonly LANDING_SUBTITLE = LANDING_SUBTITLE;
  protected readonly SCROLL_INDICATOR_TEXT = SCROLL_INDICATOR_TEXT;
  protected readonly SECTION_TITLES = SECTION_TITLES;
  protected readonly LOVE_START_DATE_DISPLAY = LOVE_START_DATE_DISPLAY;
  protected readonly SURPRISE_BUTTON_TEXT = SURPRISE_BUTTON_TEXT;
  protected readonly SURPRISE_CONTENT = SURPRISE_CONTENT;
  protected readonly FOOTER_TEXT = FOOTER_TEXT;

  // Love message with typewriter effect
  protected fullMessage = LOVE_MESSAGE;
  protected displayedMessage = signal('');
  protected messageIndex = 0;
  protected typingInterval: any;

  // Time Together Counter
  protected years = signal(0);
  protected months = signal(0);
  protected days = signal(0);
  protected hours = signal(0);
  protected countdownInterval: any;
  protected loveStartDate = LOVE_START_DATE;

  // Memories gallery
  protected memories = MEMORIES;

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
    }, TYPEWRITER_SPEED);
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
