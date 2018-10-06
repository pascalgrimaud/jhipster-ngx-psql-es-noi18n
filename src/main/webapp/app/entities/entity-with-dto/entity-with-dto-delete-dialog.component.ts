import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntityWithDTO } from 'app/shared/model/entity-with-dto.model';
import { EntityWithDTOService } from './entity-with-dto.service';

@Component({
    selector: 'jhi-entity-with-dto-delete-dialog',
    templateUrl: './entity-with-dto-delete-dialog.component.html'
})
export class EntityWithDTODeleteDialogComponent {
    entityWithDTO: IEntityWithDTO;

    constructor(
        private entityWithDTOService: EntityWithDTOService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entityWithDTOService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entityWithDTOListModification',
                content: 'Deleted an entityWithDTO'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entity-with-dto-delete-popup',
    template: ''
})
export class EntityWithDTODeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithDTO }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntityWithDTODeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entityWithDTO = entityWithDTO;
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
