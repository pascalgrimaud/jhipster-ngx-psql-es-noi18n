import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';

@Component({
    selector: 'jhi-entity-with-service-impl-delete-dialog',
    templateUrl: './entity-with-service-impl-delete-dialog.component.html'
})
export class EntityWithServiceImplDeleteDialogComponent {
    entityWithServiceImpl: IEntityWithServiceImpl;

    constructor(
        private entityWithServiceImplService: EntityWithServiceImplService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entityWithServiceImplService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entityWithServiceImplListModification',
                content: 'Deleted an entityWithServiceImpl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entity-with-service-impl-delete-popup',
    template: ''
})
export class EntityWithServiceImplDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceImpl }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntityWithServiceImplDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entityWithServiceImpl = entityWithServiceImpl;
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
