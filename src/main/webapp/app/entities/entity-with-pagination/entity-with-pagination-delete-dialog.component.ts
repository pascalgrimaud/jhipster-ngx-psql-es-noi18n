import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntityWithPagination } from 'app/shared/model/entity-with-pagination.model';
import { EntityWithPaginationService } from './entity-with-pagination.service';

@Component({
    selector: 'jhi-entity-with-pagination-delete-dialog',
    templateUrl: './entity-with-pagination-delete-dialog.component.html'
})
export class EntityWithPaginationDeleteDialogComponent {
    entityWithPagination: IEntityWithPagination;

    constructor(
        private entityWithPaginationService: EntityWithPaginationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entityWithPaginationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entityWithPaginationListModification',
                content: 'Deleted an entityWithPagination'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entity-with-pagination-delete-popup',
    template: ''
})
export class EntityWithPaginationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithPagination }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntityWithPaginationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entityWithPagination = entityWithPagination;
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
