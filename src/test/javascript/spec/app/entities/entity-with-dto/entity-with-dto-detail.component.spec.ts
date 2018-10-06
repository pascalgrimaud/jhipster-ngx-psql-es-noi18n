/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithDTODetailComponent } from 'app/entities/entity-with-dto/entity-with-dto-detail.component';
import { EntityWithDTO } from 'app/shared/model/entity-with-dto.model';

describe('Component Tests', () => {
    describe('EntityWithDTO Management Detail Component', () => {
        let comp: EntityWithDTODetailComponent;
        let fixture: ComponentFixture<EntityWithDTODetailComponent>;
        const route = ({ data: of({ entityWithDTO: new EntityWithDTO(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
