import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";

export default class ValidateForm {
    static validateFormFields(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof UntypedFormControl) {
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof UntypedFormGroup) {
                this.validateFormFields(control);
            }
        })
    }
}