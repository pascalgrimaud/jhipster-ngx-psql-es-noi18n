/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassAndPaginationDetailComponent } from 'app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassAndPagination Management Detail Component', () => {
        let comp: EntityWithServiceClassAndPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndPaginationDetailComponent>;
        const route = ({
            data: of({ entityWithServiceClassAndPagination: new EntityWithServiceClassAndPagination(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassAndPaginationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceClassAndPaginationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceClassAndPagination).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
