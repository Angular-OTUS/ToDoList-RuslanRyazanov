import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { NgClass } from "@angular/common";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";



@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterOutlet,
    TranslatePipe
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent implements OnInit {

  public currentLang: string = 'en';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  protected getCurrentTabName(): string | undefined {
    const currentPath: string = this.router.url.split('/').filter(Boolean).join('/');
    const route = this.routes.find(route => currentPath.startsWith(route.path));

    return route?.name;
  }

  protected isCurrentRoute(route: string): boolean {
    return this.getCurrentTabName() === route;
  }

  public ngOnInit(): void {
    this.setDefaultLangConfig();
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  protected getLocalTabName(): string {
    return this.translate.instant(this.getCurrentTabName()!);
  }

  private setDefaultLangConfig(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public routes = [
    {
      name: 'BACKLOG',
      path: 'backlog/tasks'
    },
    {
      name: 'BOARD',
      path: 'board'
    }
  ];

}
