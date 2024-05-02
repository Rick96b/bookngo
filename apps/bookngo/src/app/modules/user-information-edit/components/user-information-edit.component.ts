import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, delay, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '@bookngo/base';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintModule } from '@taiga-ui/core';
import { BnButtonComponent } from '@bookngo/ui-components';
import { UserInformationService } from '../services/user-information.service';
import { UserService } from '../../../base/services/user.service';

@Component({
    selector: 'app-user-information-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiHintModule, TuiInputPhoneModule, BnButtonComponent, TuiButtonModule],
    templateUrl: './user-information-edit.component.html',
    styleUrl: './user-information-edit.component.scss',
    providers: [UserInformationService]
})
export class UserInformationEditComponent implements OnInit, OnDestroy {
    protected _user: User;
    protected _userEditForm: FormGroup;
    private destroy$: Subject<null> = new Subject<null>();

    constructor(private _userService: UserService, private _fb: FormBuilder,
                private _userInformationService: UserInformationService, private _router: Router) {
    }

    ngOnInit(): void {
        console.log(this._userService.rnd + 'в edit')
        this._userService.getMe()
            .pipe(
                tap((user: User | null) => {
                    if (user) {
                        this._user = user;
                    }
                }),
                takeUntil(this.destroy$)
            ).subscribe();

        this.updateForm();
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
        this._userInformationService.updateUser(this._userEditForm.getRawValue()).pipe(
            tap(value => this._userService.updateMe(value) )
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(null)
    }
}
