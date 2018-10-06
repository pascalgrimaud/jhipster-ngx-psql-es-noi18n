import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { TestEntityMySuffixAltService } from './test-entity-my-suffix-alt.service';

@Component({
    selector: 'jhi-test-entity-my-suffix-alt-delete-dialog',
    templateUrl: './test-entity-my-suffix-alt-delete-dialog.component.html'
})
export class TestEntityMySuffixAltDeleteDialogComponent {
    testEntity: ITestEntityMySuffixAlt;

    constructor(
        private testEntityService: TestEntityMySuffixAltService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testEntityListModification',
                content: 'Deleted an testEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-entity-my-suffix-alt-delete-popup',
    template: ''
})
export class TestEntityMySuffixAltDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TestEntityMySuffixAltDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.testEntity = testEntity;
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
