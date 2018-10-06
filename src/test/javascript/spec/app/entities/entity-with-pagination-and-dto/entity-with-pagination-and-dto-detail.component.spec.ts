/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTODetailComponent } from 'app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-detail.component';
import { EntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTODetailComponent>;
        const route = ({ data: of({ entityWithPaginationAndDTO: new EntityWithPaginationAndDTO(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithPaginationAndDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithPaginationAndDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithPaginationAndDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
