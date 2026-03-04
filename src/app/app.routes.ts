import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
    {
        path: 'taskmanager',
        loadComponent: () => import('./shared/pages/task-management-page/task-management-page').then(m => m.TaskManagementPage),
         canActivate: [authGuard],

        children:[
            {
                path:  'today',
                loadComponent: () => import('./shared/pages/today-page/today-page').then(m => m.TodayPage),
                canActivate: [authGuard]
                
            },
             {
                path:  'upcoming',
                loadComponent: () => import('./shared/pages/upcoming-page/upcoming-page').then(m => m.UpcomingPage),
                canActivate: [authGuard]
            },
            {
                 path:  'taskgesture',
                loadComponent: () => import('./shared/pages/taskgesture-page/taskgesture-page').then(m => m.TaskgesturePage) ,
                canActivate: [authGuard]
            },
            {
                path: "**",
                redirectTo: 'login'

                    
            }

        ]
    },

      {
          path: 'login',
          loadComponent: () => import('./shared/pages/login-page/login-page').then(m => m.LoginComponent)
      
    },
    
//
    {
        path: '**',
        redirectTo: 'login',
    },


];
