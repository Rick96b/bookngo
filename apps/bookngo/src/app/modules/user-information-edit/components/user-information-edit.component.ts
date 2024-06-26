import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { AuthService, DestroyService, User, UserService } from '@bookngo/base';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintModule, TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'app-user-information-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputModule, TuiHintModule, TuiInputPhoneModule, TuiButtonModule, RouterLink, TuiRootModule],
    templateUrl: './user-information-edit.component.html',
    styleUrl: './user-information-edit.component.scss',
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInformationEditComponent implements OnInit {
    protected _user: User;
    protected _userEditForm: FormGroup;

    constructor(private _userService: UserService, private _fb: FormBuilder,
                private _router: Router, private destroy$: DestroyService,
                protected authService: AuthService) {
    }

    ngOnInit(): void {
        this._userService.getMe()
            .pipe(
                tap((user: User | null): void => {
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
            phoneNumber: [this._user.phoneNumber],
            salary: [this._user.salary.toString()]
        });
    }

    protected submit(): void {
        const userNewData: User = this._userEditForm.getRawValue();
        this._userService.updateMe({
            ...userNewData,
            salary: Number(userNewData.salary),
            employmentStatus: this._user.employmentStatus
        }).pipe(
            tap(() => this._router.navigate(['cabinet/profile']))
        ).subscribe();
    }
}
