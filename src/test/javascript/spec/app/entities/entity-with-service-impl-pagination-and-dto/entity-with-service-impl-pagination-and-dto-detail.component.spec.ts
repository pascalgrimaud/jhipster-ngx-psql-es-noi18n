/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from 'app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceImplPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTODetailComponent>;
        const route = ({
            data: of({ entityWithServiceImplPaginationAndDTO: new EntityWithServiceImplPaginationAndDTO(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplPaginationAndDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceImplPaginationAndDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceImplPaginationAndDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
