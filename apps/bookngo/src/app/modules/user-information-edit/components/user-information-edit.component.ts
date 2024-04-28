import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-information-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-information-edit.component.html',
  styleUrl: './user-information-edit.component.scss',
})
export class UserInformationEditComponent {
    constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {}
}
