import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from "./shared/components/loading/loading";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('task-proyect');
  sidebarOpen = signal(false);
 toggleSidebar() {
  this.sidebarOpen.set(!this.sidebarOpen());
}
}  
