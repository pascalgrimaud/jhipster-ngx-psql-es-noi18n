/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplDetailComponent } from 'app/entities/entity-with-service-impl/entity-with-service-impl-detail.component';
import { EntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImpl Management Detail Component', () => {
        let comp: EntityWithServiceImplDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplDetailComponent>;
        const route = ({ data: of({ entityWithServiceImpl: new EntityWithServiceImpl(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceImplDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceImpl).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
