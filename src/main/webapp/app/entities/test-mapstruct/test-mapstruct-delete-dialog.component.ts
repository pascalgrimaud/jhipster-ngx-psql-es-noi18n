import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { TestMapstructService } from './test-mapstruct.service';

@Component({
    selector: 'jhi-test-mapstruct-delete-dialog',
    templateUrl: './test-mapstruct-delete-dialog.component.html'
})
export class TestMapstructDeleteDialogComponent {
    testMapstruct: ITestMapstruct;

    constructor(
        private testMapstructService: TestMapstructService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testMapstructService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testMapstructListModification',
                content: 'Deleted an testMapstruct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-mapstruct-delete-popup',
    template: ''
})
export class TestMapstructDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testMapstruct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestMapstructDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testMapstruct = testMapstruct;
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
