import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';
import { TestTwoRelationshipsSameEntityMySuffixService } from './test-two-relationships-same-entity-my-suffix.service';

@Component({
    selector: 'jhi-test-two-relationships-same-entity-my-suffix-delete-dialog',
    templateUrl: './test-two-relationships-same-entity-my-suffix-delete-dialog.component.html'
})
export class TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent {
    testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix;

    constructor(
        private testTwoRelationshipsSameEntityService: TestTwoRelationshipsSameEntityMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testTwoRelationshipsSameEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testTwoRelationshipsSameEntityListModification',
                content: 'Deleted an testTwoRelationshipsSameEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-two-relationships-same-entity-my-suffix-delete-popup',
    template: ''
})
export class TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testTwoRelationshipsSameEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntity;
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
