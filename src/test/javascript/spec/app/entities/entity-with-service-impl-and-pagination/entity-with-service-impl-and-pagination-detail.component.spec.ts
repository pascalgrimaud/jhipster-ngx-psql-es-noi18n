/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndPaginationDetailComponent } from 'app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-detail.component';
import { EntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndPagination Management Detail Component', () => {
        let comp: EntityWithServiceImplAndPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndPaginationDetailComponent>;
        const route = ({
            data: of({ entityWithServiceImplAndPagination: new EntityWithServiceImplAndPagination(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndPaginationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceImplAndPaginationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceImplAndPagination).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
