import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestServiceClass } from 'app/shared/model/test-service-class.model';
import { TestServiceClassService } from './test-service-class.service';

@Component({
    selector: 'jhi-test-service-class-delete-dialog',
    templateUrl: './test-service-class-delete-dialog.component.html'
})
export class TestServiceClassDeleteDialogComponent {
    testServiceClass: ITestServiceClass;

    constructor(
        private testServiceClassService: TestServiceClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testServiceClassService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testServiceClassListModification',
                content: 'Deleted an testServiceClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-service-class-delete-popup',
    template: ''
})
export class TestServiceClassDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testServiceClass }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestServiceClassDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testServiceClass = testServiceClass;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
