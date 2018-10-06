import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlace } from 'app/shared/model/test-root/place.model';
import { PlaceService } from './place.service';

@Component({
    selector: 'jhi-place-delete-dialog',
    templateUrl: './place-delete-dialog.component.html'
})
export class PlaceDeleteDialogComponent {
    place: IPlace;

    constructor(private placeService: PlaceService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.placeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'placeListModification',
                content: 'Deleted an place'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-place-delete-popup',
    template: ''
})
export class PlaceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ place }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlaceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.place = place;
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
