import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from './test-one-to-one-my-suffix.service';

@Component({
    selector: 'jhi-test-one-to-one-my-suffix-delete-dialog',
    templateUrl: './test-one-to-one-my-suffix-delete-dialog.component.html'
})
export class TestOneToOneMySuffixDeleteDialogComponent {
    testOneToOne: ITestOneToOneMySuffix;

    constructor(
        private testOneToOneService: TestOneToOneMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testOneToOneService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testOneToOneListModification',
                content: 'Deleted an testOneToOne'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-one-to-one-my-suffix-delete-popup',
    template: ''
})
export class TestOneToOneMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testOneToOne }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestOneToOneMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testOneToOne = testOneToOne;
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
