import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { TestServiceImplService } from './test-service-impl.service';

@Component({
    selector: 'jhi-test-service-impl-delete-dialog',
    templateUrl: './test-service-impl-delete-dialog.component.html'
})
export class TestServiceImplDeleteDialogComponent {
    testServiceImpl: ITestServiceImpl;

    constructor(
        private testServiceImplService: TestServiceImplService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testServiceImplService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testServiceImplListModification',
                content: 'Deleted an testServiceImpl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-service-impl-delete-popup',
    template: ''
})
export class TestServiceImplDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testServiceImpl }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestServiceImplDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testServiceImpl = testServiceImpl;
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
