import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';
import { EntityWithServiceImplAndPaginationService } from './entity-with-service-impl-and-pagination.service';

@Component({
    selector: 'jhi-entity-with-service-impl-and-pagination-delete-dialog',
    templateUrl: './entity-with-service-impl-and-pagination-delete-dialog.component.html'
})
export class EntityWithServiceImplAndPaginationDeleteDialogComponent {
    entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination;

    constructor(
        private entityWithServiceImplAndPaginationService: EntityWithServiceImplAndPaginationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entityWithServiceImplAndPaginationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entityWithServiceImplAndPaginationListModification',
                content: 'Deleted an entityWithServiceImplAndPagination'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entity-with-service-impl-and-pagination-delete-popup',
    template: ''
})
export class EntityWithServiceImplAndPaginationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceImplAndPagination }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntityWithServiceImplAndPaginationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entityWithServiceImplAndPagination = entityWithServiceImplAndPagination;
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
