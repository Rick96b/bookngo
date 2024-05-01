import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '@bookngo/base';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintModule } from '@taiga-ui/core';
import { BnButtonComponent } from '@bookngo/ui-components';
import { UserInformationServiceService } from '../services/user-information-service.service';

@Component({
    selector: 'app-user-information-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiHintModule, TuiInputPhoneModule, BnButtonComponent, TuiButtonModule],
    templateUrl: './user-information-edit.component.html',
    styleUrl: './user-information-edit.component.scss',
    providers: [UserInformationServiceService]
})
export class UserInformationEditComponent implements OnInit {
    protected _user: User;
    protected _userEditForm: FormGroup;

    constructor(private _activatedRoute: ActivatedRoute, private _fb: FormBuilder,
                private _userInformationService: UserInformationServiceService, private _router: Router) {
    }

    ngOnInit(): void {
        this._activatedRoute.data.pipe(
            tap(({ user }): void => {
                this._user = user;
                this.updateForm();
            })
        ).subscribe();
    }

    private updateForm(): void {
        this._userEditForm = this._fb.group({
            fullName: [{ value: this._user.fullName, disabled: true }],
            companyName: [{ value: this._user.companyName, disabled: true }],
            companyDepartment: [{ value: this._user.companyDepartment, disabled: true }],
            employmentStatus: [{ value: this._user.employmentStatus.toUpperCase(), disabled: true }],
            email: [{ value: this._user.email, disabled: true }],
            telegramUsername: [this._user.telegramUsername, { Validators: [Validators.pattern(/^[A-Za-z\d_]{5,32}$/)] }],
            phoneNumber: [this._user.phoneNumber]
        });
    }

    protected submit(): void {
        this._userInformationService.updateUser(this._userEditForm.getRawValue())
            .pipe(
                tap(() => this._router.navigate(['profile']))
            ).subscribe();
    }
}
