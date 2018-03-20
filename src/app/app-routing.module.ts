import { HomeComponent,
         TabsComponent,
        JournalComponent,
        LedgerComponent,
        AccountsComponent,
        EntitiesComponent
        } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: TabsComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'journal',
                component: JournalComponent,
            },
            {
                path: 'ledger',
                component: LedgerComponent,
            },
            {
                path: 'accounts',
                component: AccountsComponent,
            },
            {
                path: 'entities',
                component: EntitiesComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
