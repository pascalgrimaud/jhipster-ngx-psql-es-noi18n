import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';
import { TestManyToOneMySuffixService } from './test-many-to-one-my-suffix.service';

@Component({
    selector: 'jhi-test-many-to-one-my-suffix-delete-dialog',
    templateUrl: './test-many-to-one-my-suffix-delete-dialog.component.html'
})
export class TestManyToOneMySuffixDeleteDialogComponent {
    testManyToOne: ITestManyToOneMySuffix;

    constructor(
        private testManyToOneService: TestManyToOneMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testManyToOneService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testManyToOneListModification',
                content: 'Deleted an testManyToOne'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-many-to-one-my-suffix-delete-popup',
    template: ''
})
export class TestManyToOneMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyToOne }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestManyToOneMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testManyToOne = testManyToOne;
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
